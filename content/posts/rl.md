---
title: VLA Models
date: 2025-12-06T18:56:12-05:00
draft: true
summary: Shiraz looks at the latest paper from physical intelligence, which should already be obsolete by the time this blog post gets done.
showToc: true
tags: ["Mechanics", "Optimization", "Probability"]
tikzjax: false
---

## <span class=tertiary>␥</span> States \& Observations
Let $\mathscr S$ be the state space of a robot, and $\mathscr O$ the observation space. The state $S_t$ at time $t$ may be the robot's joint angles as measured/estimated during times 
$$
t\mathrel, \,t-\Delta t\mathrel,\, t-2\,\Delta t\mathrel,\, \cdots\mathrel,\, t-(\mathrm n - 1)\,\Delta t
$$
where $\Delta t$ is a timestep. The observation $O_t$ could be the last $\mathrm n$ image frames seen by the robot's camera(s). The state $S_t$ and observation $O_t$ are both <span class=accented>random variables</span>. Let the state-observation pair be written as $X_t\coloneq(S_t, O_t)$, which we will simply call the "state" for simplicity. The [$\pi_{0.6}^\ast$ paper](https://www.physicalintelligence.company/blog/pistar06) refers to $X_t$ as the "observation". The augmented state-space is $\mathscr X\coloneq\mathscr S\times \mathscr O$.

The <i>state</i> $X_t$ does not merely represent noisy/partial information about our robot, but also includes information about the environment and objects that our robot interacts with. The goal of learning-based control is to learn a policy that maps $X_t$ to an action $A_t$, so that the robot can interact with (and respond to) its environment.

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
Firstly, the subscripts for "$p$" indicate that two different functions are used on either side — on the left, and we are evaluating the conditional pdf of $X_{t+s}$ (a random variable) conditioned on $X_{[0,t]}$ (a random variable/trajectory), and we are evaluating this pdf at $(x,\chi)$. Secondly, $X_t$ is a random variable while $x$ represents an arbitrary point in $\mathscr X$, making it clear that the above equality is assumed to hold for *any* point $x\in\mathscr X$. Similarly, it is assumed to hold for any trajectory $\chi$.

<aside class=aside-right>
We can replace $[0,t]$ with $\lbrace 0, \Delta t, \cdots, {t-\Delta t}, t\rbrace$ to recover the discrete-time formulation. For instance, a discrete-time trajectory may be viewed as a function from the integers to $\mathscr X$ (or a section of a fiber bundle with base space the integers).
</aside>

In practice, we can augment the state with additional information to ensure a Markov-like property. 

## <span class=tertiary>␥</span> Trajectories \& Policies

So, $X_{[0,t]}$ is a random state trajectory (from $0$ to $t$), and $\chi$ is an example of a value that it can take. This implies the existence of a pdf $p_{X_{[0,t]}}(\chi)$ that should somehow "integrate to $1$". What is its domain? To simplify things, we can write the trajectory-space as $C([0, t],\mathscr X)$, suggesting (without much loss of generality) that the function $\chi\in C([0, t],\mathscr X)$ is continuous.[^trajspace]

[^trajspace]: Another possibility is to consider the trivial [fiber bundle](/posts/bundles) $\mathscr X \times \mathbb R\rightarrow \mathbb R$. The space of trajectories is then the space of [sections](http://staff.ustc.edu.cn/~wangzuoq/Courses/18F-Manifolds/Notes/Lec28.pdf) of this bundle.

The goal of learning-based control is to learn a <span class=accented>policy</span> $p_{A_t|X_t}(a|x)$ — a conditional pdf that specifies the probability density of the robot taking action $a$ given that it is at the state $x$. This is something that a roboticist *designs* and *implements*, e.g., using behavior cloning or RL. Let's assume that the policy is time-invariant: $$\pi_{A_t|X_t}=\pi_{A_s|X_s}\eqcolon \pi$$
for all $t,s\in[0,\infty)$.
We can always cheat and add $t$ to the state to make this simplification hold. 

Now, suppose there is some underlying distribution of initial conditions (represented by $X_0$) and we fix a policy $\pi$, then we get a combined stochastic process $(X_t,A_t)_{t\in[0,\infty)}$, which is the random state-action trajectory. If we have a dataset of state-action trajectories, we can learn the $\pi$ that would generate them; this is behavior cloning. We can also make small perturbations to $\pi$ to see if the resulting trajectories improve upon some reward function (in expectation); this is RL. Regularization can be introduced to ensure that the perturbed policy doesn't deviate too far from some baseline policy (as done in TRPO and PPO). The regularization term is typically a [divergence](https://en.wikipedia.org/wiki/Divergence_(statistics)) between $(X_t,A_t)_{t\in[0,\infty)}$ and the baseline policy.

## <span class=tertiary>␥</span> Action Chunking

<aside class=aside-right>
Do you (presumably a human) also operate on such a latency? In your case, $\delta$ is perhaps the time delay between when your <a href=https://www.teamfortress.com class=accented>Team Fortress 2</a> enemy first appears on-screen to when you begin moving the reticle towards their head. It is impressively small!
</aside>

In practice, the roboticist may only be able to specify $p_{A_{t+\delta}|X_t}(a|x)$ due to latency issues! Since doing model inference takes an $\delta >0$ amount of time, it is impossible to act at time $t$ based on the information at $t$.[^latency] Inference is expensive; if we inferenced at each (discretized) timestep, then the frequency of our outputs to the robot will be inherently limited by how fast we can do inference. The (currently) most well-known workaround is to ensure that each inference call produces a <span class=accented>chunk</span> of actions, i.e., a sequence of actions to be executed over the next $\mathrm h$ timesteps, where $\mathrm h$ is called the <span class=accented>horizon</span>. This is <span class=accented>action chunking</span>. In practice, it is common to execute only $\mathrm e < \mathrm h$ actions from the chunk before requesting a new chunk of actions from the model, where $\mathrm e \approx \mathrm h/2$.[^greedy]

[^greedy]: If only $\mathrm e < \mathrm h$ actions are executed, then why do we predict the remaining $\mathrm h - \mathrm e$ actions at all? My understanding is that this encourages the model to think long-term (*a la* model-predictive control) rather than resorting to a greedy policy.

[^latency]: The OpenVLA has $\delta \approx 320\,ms$ after accounting for model inference, network latency, and other overheads.

However, what happens at the end of the chunk? There are two issues here:
1. After executing a chunk, we still need to wait $\delta$ milliseconds to get the next chunk of actions. Our robot hasn't been told what to do during this time; if $\delta > \Delta t$, then there will be a noticeable pause in the robot's motion.
2. Our VLA model doesn't remember what it spat out during the last chunk, so the next chunk it produces will not continuously or smoothly align with the previous chunk.

In my opinion, these aren't very serious issues; as long as you have a robust VLA model, you can tell your robot to do the dishes and go to bed -- the robot will do the dishes overnight in all of its jerky, jittery glory. However, these *are* serious issues for robotics labs because it makes for some seriously unimpressive demos. Recent papers from [Physical Intelligence](https://www.pi.website) have attempted to address these issues. 

The idea of [real-time chunking (RTC)](https://arxiv.org/pdf/2506.07339) is to do the following. Let $\mathrm d \coloneq \lfloor \delta / \Delta t \rfloor$ be the number of timesteps that the model takes to do its inference, i.e., the *inference delay*.
Suppose we already have this sequence of actions at timestep $t$:
$$
a_{t}, a_{t + \Delta t}, \cdots, a_{t + (\mathrm h-1) \Delta t}
$$
Then, in two parallel threads, do the following:
  - execute the first $\mathrm e$ actions in the chunk
  - as $a_{t + \mathrm e \Delta t}$ is being executed, initiate another call for inference; condition this inference on the remaining $\mathrm d$ actions that will be executed while the inference is happening.[^inpainting]

The conditioning step can be viewed as <span class=accented>freezing</span> the first $\mathrm d$ actions (copied from the previous chunk) and *inpainting* the rest of the action chunk, similar to how image inpainting works. This way, we have new chunk of actions waiting for us at time $\mathrm e$, and this new chunk will (due to the conditioning) smoothly continue from the previous chunk. The robot doesn't have to stop moving, and the chunks are smoothly stitched together. 

The paper I linked above is actually better-described as [inference-time RTC](https://arxiv.org/pdf/2506.07339). It uses a gradient-based inpainting method to fill in the missing actions; basically, the score/velocity vector in the diffusion/flow-matching process incurs an additional term calculated via a vector-Jacobian product (VJP), which ensures that the denoised/flow-matched chunk begins with the $\mathrm d$ frozen actions.

[Training-time RTC](https://arxiv.org/pdf/2512.05964) is concerned with the problem that the gradient-based inpainting is expensive. Their solution is to simply not denoise the first $\mathrm d$ actions during inference