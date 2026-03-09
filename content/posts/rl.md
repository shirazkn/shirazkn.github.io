---
title: VLA Models
date: 2025-12-06T18:56:12-05:00
draft: false
summary: A review of the basic concepts that go into the design and training of VLA models.
showToc: true
tags: ["Optimization", "Probability", "Robotics"]
tikzjax: false
---

As research labs are beginning to phase out Vision Language Action (VLA) models in favor of the newer "world models", this is a perfect time to look back on a field that has had some time to mature, and put together some notation that makes it easier to talk about the central concepts. Most of the technical content is borrowed from the papers by [Physical Intelligence](https://www.pi.website), some of it comes from my background in control theory.

## States \& Observations
Let $\mathscr S$ be the state space of a robot. The <span class=accented>state</span> at time $t$ is written as $S_t$, which is an $\mathscr S$-valued random variable. For example, $S_t$ may be the robot's joint angles at times 
$$
\begin{array}{c@{\,,\ }c@{\,,\ }c@{\,,\ }c@{\,,\ }c@{}c}
t-(\mathrm n - 1)\tau & \cdots \,&  t-2\tau & t-\tau & t
\end{array}
$$
where $\tau$ is a timestep. In this case, $\mathscr S=(SO(2))^{\mathrm j\mathrm n}$, $\mathrm j$ is the number of joints, and $\mathrm n$ is the number of timesteps. The state could also include the last $\mathrm n$ image frames seen by the robot's camera(s) and a natural language description of the task assigned to the robot. The [$\pi_{0.6}^\ast$ paper](https://www.physicalintelligence.company/blog/pistar06) refers to $S_t$ as the "observation", but we will call it the "state" for simplicity.

<aside class=aside-right>
In control theory, the <i>state-transition map</i> tells you how the state of a system evolves over time, subject to some state-dependent control inputs. We can formulate something similar in the stochastic setting using a stochastic differential equation (SDE) or its corresponding Fokker-Planck equation.
</aside>


## Actions

The goal of learning-based control is to learn a <span class=accented>policy</span>, which is a mapping that takes $S_t$ and outputs an <span class=accented>action</span> $A_t$. A policy enables the robot to interact with (and respond to changes in) its environment. We may expect our mapping from $S_t$ to $A_t$ to be deterministic, nevertheless, it proves to be more convenient to consider a probabilistic policy. Let the policy <span class=accented>$\pi$</span> be the conditional pdf $\pi(a,s)\coloneqq f_{A_t|S_t}(a|s)$ that tells you the probability density of taking the action $a$ given the state $s$. As the notation suggests, we have assumed that $\pi$ does not explicitly depend on time (though one could always cheat and include $t$ itself as a variable in $S_t$).

Diffusion and flow-matching policies became extremely fashionable in 2025. In fact, there exists a continuous spectrum of <span class=accented>generative policies</span> that interpolates between diffusion (SDE-based generation) and flow-matching (ODE generation with random initial condition). Generative policies learn how to generate samples from $\pi(\,\cdot\,,s)$ for each $s\in\mathscr S$, rather than learning the pdf $\pi$ directly. While the generative model serves as the <span class=accented>action head</span>, the observations are passed through a vision encoder that goes into a VLM (vision-language model), which in turn steers the action head via something like [FiLM](https://arxiv.org/abs/1709.07871).

## Trajectories

I will use the following notation to represent a family of random variables indexed by time, called a <span class=accented>stochastic process</span>: 
$$
S_{[0,\infty)}\coloneq (S_t)_{t\in[0,\infty)}
$$ 
The family $S_{[0,\infty)}$ is assumed to satisfy a Markov property:[^trajspace]
$$
f_{S_{t+\Delta t}| S_{[0,t]}}(s|{\mathscr s}) = f_{S_{t+\Delta t}|S_t}\big(s|{\mathscr s}(t)\big),
$$
where ${\mathscr s}: [0,t] \rightarrow \mathscr S$ is a curve (i.e., a trajectory) in $\mathscr S$. In practice, we can augment the state with additional information to ensure a Markov-like property. 

<aside class=aside-center>
Take a second to digest this notation.
The subscripts for "$f$" indicate that two different functions are used on either side — on the left, and we are evaluating the conditional pdf of $S_{t+\Delta t}$ (a random variable) conditioned on $S_{[0,t]}$ (a random variable), and we are evaluating this pdf at $(s,{\mathscr s})$. That is, $S_t$ is a random variable while $s$ represents an arbitrary point in $\mathscr S$. Similarly, $S_{[0,t]}$ is a random variable and ${\mathscr s}$ is a sample of this random variable.
</aside>

[^trajspace]: My notation here implies the existence of a pdf $f_{S_{[0,t]}}({\mathscr s})$ that should somehow "integrate to $1$". What is its domain? To simplify things, we can write the trajectory-space as $\mathcal C([0, t],\mathscr S)$, assuming without much loss of generality that the trajectory ${\mathscr s}\in \mathcal C([0, t],\mathscr S)$ is continuous. Another possibility is to consider the trivial [fiber bundle](/posts/bundles) $\mathscr S \times \mathbb R\rightarrow \mathbb R$. The space of trajectories is then the space of [sections](http://staff.ustc.edu.cn/~wangzuoq/Courses/18F-Manifolds/Notes/Lec28.pdf) of this bundle. In the discrete-time case, we replace $\mathbb R$ with $\mathbb Z_{+}$.

We can replace $[0,t]$ with $\lbrace 0, 1, 2, \ldots, {\rm k}\rbrace$ to recover the discrete-time formulation. For instance, a discrete-time trajectory may be viewed as a map $\lbrace 0, 1, 2 \ldots \rbrace \rightarrow \mathscr S$.

## Datasets
Given an underlying distribution over initial conditions (represented by $S_0$), a policy $\pi$, and a stochastic dynamical model for the system (e.g., an underlying SDE), we get a combined stochastic process $(S_t,A_t)_{t\in[0,\infty)}$. This is the random state-action trajectory. Conversely, if we have a <span class=accented>dataset</span> of state-action trajectories, we can learn the $\pi$ that would generate them; this is <span class=accented>behavior cloning</span>. We can also make small perturbations to $\pi$ to see if the resulting trajectories improve upon some reward function (in expectation); this is <span class=accented>reinforcement learning</span>. Regularization can be introduced to ensure that the perturbed policy doesn't deviate too far from some baseline policy (as done in TRPO and PPO). The regularization term is typically an information-theoretic [divergence](https://en.wikipedia.org/wiki/Divergence_(statistics)) between $(S_t,A_t)_{t\in[0,\infty)}$ and the baseline policy; the divergence between two distributions measures how much they differ from each other.

## Action Chunking

<aside class=aside-right>
Do you (presumably a human) also operate on such a latency? In your case, $\delta$ is perhaps the time delay between when your <a href=https://www.teamfortress.com class=accented>Team Fortress 2</a> enemy first appears on-screen to when you begin moving the reticle towards their head. It is impressively small!
</aside>

In practice, the roboticist may only be able to specify $f_{A_{t+\delta}|S_t}(a|s)$ due to latency issues! Since doing model inference takes an $\delta >0$ amount of time, it is impossible to act at time $t$ based on the information at $t$.[^latency] Inference is expensive; if we inferenced a VLA model at each timestep, then the frequency of our model's outputs will be inherently limited by how fast inference takes. The (currently) most well-known workaround is to ensure that each inference call produces a <span class=accented>chunk</span> of actions, i.e., a sequence of actions to be executed over the next $\mathrm h_{\text{pr}}$ timesteps, where $\mathrm h_{\text{pr}}$ is called the <span class=accented>prediction horizon</span>. This is <span class=accented>action chunking</span>. In practice, it's common to execute only $\mathrm h_{\text{ex}} < \mathrm h_{\text{pr}}$ actions from the chunk before requesting a new chunk of actions from the model, where $\mathrm h_{\text{ex}} \approx \mathrm h_{\text{pr}}/2$.[^greedy] We call $\mathrm h_{\text{ex}}$ the <span class=accented>execution horizon</span>.

[^greedy]: If only $\mathrm h_{\text{ex}} < \mathrm h_{\text{pr}}$ actions are executed, then why do we predict the remaining $\mathrm h_{\text{pr}} - \mathrm h_{\text{ex}}$ actions at all? My understanding is that this encourages the model to think long-term (*a la* model-predictive control) rather than resorting to a greedy policy.

[^latency]: In flow-based generation, we have to do 5 or more forward passes to get the denoised action chunk. Even [OpenVLA](https://openvla.github.io) (which I do not believe is flow-based) has $\delta \approx 320\,ms$ after accounting for model inference, network latency, and other overheads. The VLM backbone is typically beefier than the action head, so a bulk of the inference overhead sits there.

However, what happens at the end of the chunk? There are two issues here:
1. After executing a chunk, we still need to wait $\delta$ milliseconds to get the next chunk of actions. Our robot hasn't been told what to do during this time; if $\delta > \tau$, then there will be a noticeable pause in the robot's motion.
2. Our VLA model doesn't remember what it spat out during the last chunk, so the next chunk it produces will not continuously or smoothly align with the previous chunk.

In my opinion, these aren't very serious issues; as long as you have a robust VLA model you can tell your robot to do the dishes and go to bed -- the robot will do the dishes overnight (albeit a little more loudly than you'd like). These *are* however very serious issues at robotics labs like [Physical Intelligence](https://www.pi.website) because it makes for some seriously unimpressive demos. 

The idea of [real-time chunking (RTC)](https://www.pi.website/research/real_time_chunking) is to do the following. Let $\mathrm d \coloneq \lfloor \delta / \tau \rfloor$ be the number of timesteps that the model takes to do its inference, i.e., the *inference delay*.
Suppose we already have this sequence of actions at timestep $t$:
$$
\begin{array}{ccccc}
a_{t} & a_{t + \tau} & a_{t + 2\tau} & \cdots & a_{t + (\mathrm h_{\text{pr}}-1) \tau}
\end{array}
$$
Then, in two parallel threads, do the following (assuming $\mathrm h_{\text{pr}}\geq \mathrm h_{\text{ex}} + \mathrm d$):
  - execute the first $\mathrm h_{\text{ex}}$ actions in the chunk
  - after $a_{t + (\mathrm h_{\text{ex}}-1) \tau}$ is executed, initiate another call for inference; condition this inference on the next $\mathrm d$ actions in the chunk: 
  $$
  \begin{array}{cccc}
  a_{t+\mathrm h_{\text{ex}} \tau} & a_{t +(\mathrm h_{\text{ex}} + 1)\tau} & \cdots & a_{t + (\mathrm h_{\text{ex}}+\mathrm d - 1) \tau}
  \end{array}
  $$
  as these actions will be executed while the inference is happening!

The conditioning step can be viewed as <span class=accented>freezing</span> the next $\mathrm d$ actions of the previous chunk and *inpainting* the rest of the action chunk, using the same algorithms as those used for image inpainting. This way, we have new chunk of actions waiting for us at time $t+(\mathrm h_{\text{ex}}+\mathrm d)\tau$, and this new chunk will (due to the inpainting) smoothly continue from the previous chunk. The robot thinks as it acts.

The paper I linked above is actually better-described as [inference-time RTC](https://www.pi.website/research/real_time_chunking). It uses a gradient-based inpainting method to fill in the missing actions. Basically, the score <span class=tertiary>(or velocity)</span> vector in the diffusion <span class=tertiary>(or flow-matching)</span> process incurs an additional term calculated via a vector-Jacobian product, ensuring that the denoised <span class=tertiary>(or flow-matched)</span> chunk begins with the $\mathrm d$ frozen actions. So "conditioning" here refers to the gradient-based correction term that is used to inpaint the prefix of the action chunk.

[Training-time RTC](https://arxiv.org/pdf/2512.05964) is concerned with the problem that the gradient-based inpainting is expensive. Their solution is to simply *not* denoise the first $\mathrm d$ actions during inference. So, the adjectives inference-time vs. training-time is a bit misleading; both algorithms require some inference-time modifications over the vanilla diffusion <span class=tertiary>(or flow matching)</span> VLA policy. While IT-RTC doesn't require any training-time changes, TT-RTC may need small architectural and training-time changes. That said, the main difference between IT-RTC and TT-RTC is in how they hold the frozen actions in place during inference.

## Rewards \& Value Functions

Given a state-action pair $(s,a)$, let the pdf $f_{S_{t+\tau}|S_t}(s'|s,a)$ be the <span class=accented>state-transition function</span> -- it gives the probability density of ending up at $s'$ in the next time instant. Assume for simplicity that our system is time-invariant, i.e., $f\coloneq f_{S_{t+\tau}|S_t}$ does not depend on $t$.[^dirac]

[^dirac]: If $\pi^\ast$ is a value-maximizing policy, it will satisfy $\pi^\ast(a|s)=\delta(a-a^\ast(s))$, where $\delta$ is the Dirac delta function and $a^\ast(s)=\arg\max_{a\in\mathscr A}Q(s,a)$. So, some of the expectations in the above definitions will turn into $\max$es.

We can now introduce well-known definitions from reinforcement learning:
- The <span class=accented>reward</span> function is a map $R:\mathscr S\times \mathscr A \rightarrow \mathbb R$.
- The <span class=accented>value function</span> $V^\pi$ is the expected total reward when following policy $\pi$. It satisfies $$V^\pi(s)=\mathbb E_{a\sim\pi(\,\cdot\,|s)}\left[R(s,a)+\gamma \,R'(s,a)\right]$$ where $R'$ is the "expected future reward" $$R'(s,a)\coloneqq\mathbb E_{s'\sim f(\,\cdot\,|s,a)}\left[V^\pi(s')\right]$$and $\gamma\in(0,1]$ is a discount factor. (This can work as a definition of $V^\pi$; it is stated as an implicit/recursive definition for convenience.)
- The <span class=accented>Q-function</span> is the thing inside the expectation in the definition of $V^\pi$, so we have $$V^\pi(s)=\mathbb E_{a\sim\pi(\,\cdot\,|s)}\left[Q^\pi(s,a)\right]$$ Note that $R$ satisfies $$R(s,a)=Q^\pi(s,a)-\gamma\mathbb E_{s'\sim f}\left[V^\pi(s')\right]$$ but it doesn't actually depend on $\pi$, only the right-hand side does!
- The <span class=accented>advantage</span> function is $$\begin{align}A^\pi(s,a)&=Q^\pi(s,a)-V^\pi(s)\\&=Q^\pi(s,a)-\mathbb E_{a\sim\pi}\big[Q^\pi(s,a)\big]\end{align}$$

In a typical VLA pipeline, the policy is first learned via behavior cloning on a large dataset of demonstrations, then fine-tuned using RL (e.g., PPO) to improve task success rates. Chris Paxton has [a nice writeup](https://itcanthink.substack.com/p/the-limits-of-reinforcement-learning) on the role of reinforcement learning in the age of behavior cloning. 