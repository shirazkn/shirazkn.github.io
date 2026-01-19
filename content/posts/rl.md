---
title: VLA Models
date: 2025-12-06T18:56:12-05:00
draft: true
summary: I look at some of the central ideas that go into designing and training VLA models, using the latest papers by Physical Intelligence as reference.
showToc: true
tags: ["Mechanics", "Optimization", "Probability"]
tikzjax: false
---

## States \& Observations
Let $\mathscr S$ be the state space of a robot and $\mathscr O$ the observation space. The state at time $t$ is written as $S_t$, which is an $\mathscr S$-valued random variable. For example, $S_t$ may be the robot's joint angles at times 
$$
\begin{array}{c@{\,,\ }c@{\,,\ }c@{\,,\ }c@{\,,\ }c@{}c}
t-(\mathrm n - 1)\tau & \cdots \,&  t-2\tau & t-\tau & t
\end{array}
$$
where $\tau$ is a timestep. In this example, $\mathscr S=(SO(2))^{\mathrm j\mathrm n}$, where $\mathrm j$ the number of joints and $\mathrm n$ is the number of timesteps. The observation $O_t$ could be the last $\mathrm n$ image frames seen by the robot's camera(s). The state $S_t$ and observation $O_t$ are both <span class=accented>random variables</span>. Let the state-observation pair be written as $X_t\coloneq(S_t, O_t)$, which we will simply call the "state" for simplicity. The [$\pi_{0.6}^\ast$ paper](https://www.physicalintelligence.company/blog/pistar06) refers to $X_t$ as the "observation". The augmented state-space is $\mathscr X\coloneq\mathscr S\times \mathscr O$.

The <i>state</i> $X_t$ does not merely represent noisy/partial information about our robot, but also includes information about the environment and objects that our robot interacts with. The goal of learning-based control is to learn a mapping that takes $X_t$ and outputs an action $A_t$, enabling the robot to interact with (and respond to) its environment.

I will use the following notation to represent a family of random variables indexed by time, called a <span class=accented>stochastic process</span>: 
$$
X_{[0,\infty)}\coloneq (X_s)_{s\in[0,\infty)}
$$ 
The family $X_{[0,\infty)}$ is assumed to satisfy a Markov property:
$$
p_{X_{t+s}| X_{[0,t]}}(x|\chi)=p_{X_{t+s}|X_t}\big(x|\chi(t)\big),
$$
where $\chi: [0,t] \rightarrow \mathscr X$ is a state trajectory.
Maybe this sick-looking notation unsettles you, but I find it to be much cleaner than what is typically used in the reinforcement learning (RL) literature.
Firstly, the subscripts for "$p$" indicate that two different functions are used on either side — on the left, and we are evaluating the conditional pdf of $X_{t+s}$ (a random variable) conditioned on $X_{[0,t]}$ (a random variable), and we are evaluating this pdf at $(x,\chi)$. Secondly, $X_t$ is a random variable while $x$ represents an arbitrary point in $\mathscr X$, making it clear that the above equality is assumed to hold for *any* point $x\in\mathscr X$. Similarly, it is assumed to hold for any trajectory $\chi$. In practice, we can augment the state with additional information to ensure a Markov-like property. 

<aside class=aside-right>
We can replace $[0,t]$ with $\lbrace 0, \tau, \cdots, {t-\tau}, t\rbrace$ to recover the discrete-time formulation. For instance, a discrete-time trajectory may be viewed as a function from the integers to $\mathscr X$ (or a section of a fiber bundle with base space the integers).
</aside>

## Trajectories \& Policies

So, $X_{[0,t]}$ is a random state trajectory (from $0$ to $t$), and $\chi$ is an example of a value that it can take. This implies the existence of a pdf $p_{X_{[0,t]}}(\chi)$ that should somehow "integrate to $1$". What is its domain? To simplify things, we can write the trajectory-space as $C([0, t],\mathscr X)$, assuming without much loss of generality that the trajectory $\chi\in C([0, t],\mathscr X)$ is continuous.[^trajspace]

[^trajspace]: Another possibility is to consider the trivial [fiber bundle](/posts/bundles) $\mathscr X \times \mathbb R\rightarrow \mathbb R$. The space of trajectories is then the space of [sections](http://staff.ustc.edu.cn/~wangzuoq/Courses/18F-Manifolds/Notes/Lec28.pdf) of this bundle.

The goal of learning-based control is to learn a <span class=accented>policy</span> $p_{A_t|X_t}(a|x)$ — a conditional pdf that specifies the probability density of the robot taking action $a$ given that it is at the state $x$. This is something that a roboticist *designs* and *implements*, e.g., using behavior cloning or RL. Let's assume that the policy is time-invariant: $$p_{A_t|X_t}=p_{A_s|X_s}\eqcolon \pi$$
for all $t,s\in[0,\infty)$.
We can always cheat and add $t$ to the state to make this simplification hold. 

Now, suppose there is some underlying distribution of initial conditions (represented by $X_0$) and we fix a policy $\pi$, then we get a combined stochastic process $(X_t,A_t)_{t\in[0,\infty)}$, which is the random state-action trajectory. Conversely, if we have a dataset of state-action trajectories, we can learn the $\pi$ that would generate them; this is <span class=accented>behavior cloning</span>. We can also make small perturbations to $\pi$ to see if the resulting trajectories improve upon some reward function (in expectation); this is <span class=accented>reinforcement learning</span>. Regularization can be introduced to ensure that the perturbed policy doesn't deviate too far from some baseline policy (as done in TRPO and PPO). The regularization term is typically an information-theoretic [divergence](https://en.wikipedia.org/wiki/Divergence_(statistics)) between $(X_t,A_t)_{t\in[0,\infty)}$ and the baseline policy; the divergence between two distributions measures how much they differ from each other, statistically.

## Action Chunking

<aside class=aside-right>
Do you (presumably a human) also operate on such a latency? In your case, $\delta$ is perhaps the time delay between when your <a href=https://www.teamfortress.com class=accented>Team Fortress 2</a> enemy first appears on-screen to when you begin moving the reticle towards their head. It is impressively small!
</aside>

In practice, the roboticist may only be able to specify $p_{A_{t+\delta}|X_t}(a|x)$ due to latency issues! Since doing model inference takes an $\delta >0$ amount of time, it is impossible to act at time $t$ based on the information at $t$.[^latency] Inference is expensive; if we inferenced at each (discretized) timestep, then the frequency of our outputs to the robot will be inherently limited by how fast we can do inference. The (currently) most well-known workaround is to ensure that each inference call produces a <span class=accented>chunk</span> of actions, i.e., a sequence of actions to be executed over the next $\mathrm h$ timesteps, where $\mathrm h$ is called the <span class=accented>horizon</span>. This is <span class=accented>action chunking</span>. In practice, it is common to execute only $\mathrm e < \mathrm h$ actions from the chunk before requesting a new chunk of actions from the model, where $\mathrm e \approx \mathrm h/2$.[^greedy]

[^greedy]: If only $\mathrm e < \mathrm h$ actions are executed, then why do we predict the remaining $\mathrm h - \mathrm e$ actions at all? My understanding is that this encourages the model to think long-term (*a la* model-predictive control) rather than resorting to a greedy policy.

[^latency]: OpenVLA has $\delta \approx 320\,ms$ after accounting for model inference, network latency, and other overheads.

However, what happens at the end of the chunk? There are two issues here:
1. After executing a chunk, we still need to wait $\delta$ milliseconds to get the next chunk of actions. Our robot hasn't been told what to do during this time; if $\delta > \tau$, then there will be a noticeable pause in the robot's motion.
2. Our VLA model doesn't remember what it spat out during the last chunk, so the next chunk it produces will not continuously or smoothly align with the previous chunk.

In my opinion, these aren't very serious issues; as long as you have a robust VLA model you can tell your robot to do the dishes and go to bed -- the robot will do the dishes overnight in all of its jerky, jittery glory. However, these *are* serious issues for robotics labs like [Physical Intelligence](https://www.pi.website) because it makes for some seriously unimpressive demos. Recent papers from Physical Intelligence have attempted to address these issues. 

The idea of [real-time chunking (RTC)](https://www.pi.website/research/real_time_chunking) is to do the following. Let $\mathrm d \coloneq \lfloor \delta / \tau \rfloor$ be the number of timesteps that the model takes to do its inference, i.e., the *inference delay*.
Suppose we already have this sequence of actions at timestep $t$:
$$
\begin{array}{ccccc}
a_{t} & a_{t + \tau} & a_{t + 2\tau} & \cdots & a_{t + (\mathrm h-1) \tau}
\end{array}
$$
Then, in two parallel threads, do the following (assuming $\mathrm h\geq \mathrm e + \mathrm d$):
  - execute the first $\mathrm e$ actions in the chunk
  - as $a_{t + \mathrm e \tau}$ is being executed, initiate another call for inference; condition this inference on the next $\mathrm d$ actions in the chunk: 
  $$
  \begin{array}{cccc}
  a_{t+\mathrm e \tau} & a_{t +(\mathrm e + 1)\tau} & \cdots & a_{t + (\mathrm e+\mathrm d - 1) \tau}
  \end{array}
  $$
  as these actions will be executed while the inference is happening!

The conditioning step can be viewed as <span class=accented>freezing</span> the next $\mathrm d$ actions of the previous chunk and *inpainting* the rest of the action chunk, using the same algorithms as those used for image inpainting. This way, we have new chunk of actions waiting for us at time $t+(\mathrm e+\mathrm d)\tau$, and this new chunk will (due to the conditioning) smoothly continue from the previous chunk. The robot doesn't have to stop moving, and the chunks are smoothly stitched together. 

The paper I linked above is actually better-described as [inference-time RTC](https://www.pi.website/research/real_time_chunking). It uses a gradient-based inpainting method to fill in the missing actions. Basically, the score <span class=tertiary>(or velocity)</span> vector in the diffusion <span class=tertiary>(or flow-matching)</span> process incurs an additional term calculated via a vector-Jacobian product, ensuring that the denoised <span class=tertiary>(or flow-matched)</span> chunk begins with the $\mathrm d$ frozen actions. So "conditioning" here refers to the gradient-based correction term.

[Training-time RTC](https://arxiv.org/pdf/2512.05964) is concerned with the problem that the gradient-based inpainting is expensive. Their solution is to simply not denoise the first $\mathrm d$ actions during inference, but to pass these as observations to the denoising process (e.g., as part of the [FiLM conditioning](https://arxiv.org/abs/1709.07871) module). So the main difference is in how the conditioning is done. The adjectives inference-time vs. training-time is a bit misleading; both algorithms require some inference-time modifications over the vanilla diffusion <span class=tertiary>(or flow matching)</span> VLA policy, but IT-RTC doesn't require any training-time changes.