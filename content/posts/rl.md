---
title: A Pedantic Introduction to VLA Models
date: 2025-12-06T18:56:12-05:00
draft: true
summary: Shiraz looks at the latest paper from physical intelligence, which should already be obsolete by the time this blog post gets done. 
showtoc: true
tags: ["Mechanics", "Optimization", "Probability"]
---

## <span class=tertiary>␥</span> States \& Observations
Let $\mathscr S$ be the state space of a robot, and $\mathscr O$ the observation space. The state $S_t$ might include robot's joint angles as measured/estimated during times $\lbrace t-\mathrm k \varepsilon:\mathrm k=0,1,\cdots,\mathrm n \rbrace$, where $\varepsilon$ is a timestep. The observation $O_t$ could be the last few image frames seen by the robot's camera(s). The state $S_t$ and observation $O_t$ are both <span class=accented>random variables</span>. Let the state-observation pair be written as $X_t\coloneq(S_t, O_t)$, which we will call the (augmented) state for simplicity. The [$\pi_{0.6}^\ast$ paper](https://www.physicalintelligence.company/blog/pistar06) refers to $X_t$ as the "observation". The augmented state space is then $\mathscr X\coloneq\mathscr S\times \mathscr O$.

<aside class=aside-right>
Note that the <i>observation</i> is different from the concept of a <i>measurement</i>  in control theory — the observation does not merely represent noisy/partial information about our robot, but also includes information about the environment and objects that our robot interacts with. That is, the observation contains some useful information that even a perfect knowledge of the system state will not suffice to deduce.
</aside>

I will use the following notation to represent a family of random variables indexed by time, called a <span class=accented>stochastic process</span>: 
$$X_{[0,\infty)}\coloneq (X_s)_{s\in[0,\infty)}.$$ 
The family $X_{[0,\infty)}$ is assumed to satisfy a Markov property:
$$
p_{X_{t+s}| X_{[0,t]}}(x|\chi)=p_{X_{t+s}|X_t}\big(x|\chi(t)\big),
$$
where $\chi:\mathbb [0,t] \rightarrow \mathscr X$ is a state trajectory.
Maybe this sick-looking notation unsettles you, but I find it to be much cleaner than what is typically used in the reinforcement learning (RL) literature.
Firstly, the subscripts for "$p$" indicate that two different functions are used on either side — on the left, and we are evaluating the conditional pdf of $X_{t+s}$ (a random variable) conditioned on $X_{[0,t]}$ (a random variable/trajectory), and we are evaluating this pdf at $(x,\chi)$. Secondly, $X_t$ is a random variable while $x$ represents an arbitrary point in $\mathscr X$, making it clear that the above equality is assumed to hold for *any* point $x\in\mathscr X$. Similarly, it is assumed to hold for any trajectory $\chi$.

In practice, we can augment the state/observation with additional information to ensure a Markov-like property. 

## <span class=tertiary>␥</span> Trajectories \& Policies

<aside class=aside-right>
We can replace $[0,t]$ with $\lbrace 0, \varepsilon, \cdots, {t-\varepsilon}, t\rbrace$ to recover the discrete-time formulation. For instance, a discrete-time trajectory may be viewed as a function from the integers to $\mathscr X$ (or a section of a fiber bundle with base space the integers).
</aside>

So, $X_{[0,t]}$ is a random state trajectory (from $0$ to $t$), and $\chi$ is an example of a value that it can take. This implies the existence of a pdf $p_{X_{[0,t]}}(\chi)$ that should somehow "integrate to $1$". What is its domain? One possibility is to consider the trivial [fiber bundle](/posts/bundles) $\mathscr X \times \mathbb R\rightarrow \mathbb R$. The space of trajectories is then the space of [sections](http://staff.ustc.edu.cn/~wangzuoq/Courses/18F-Manifolds/Notes/Lec28.pdf) of this bundle. If that means nothing to you, then we can simply write the trajectory-space as $C([0, t],\mathscr X)$, suggesting (without much loss of generality) that the function $\chi$ is continuous.

The goal of learning-based control is to learn a <span class=accented>policy</span> $p_{A_t|X_t}(a|x)$ — a conditional pdf that specifies the probability density of the robot taking action $a$ given that it is at the state $x$. This is something that a roboticist *designs* and *implements*, e.g., using behavior cloning or RL. Let's assume that the policy is time-invariant: $$\pi_{A_t|X_t}=\pi_{A_s|X_s}\eqcolon \pi$$
for all $t,s\in[0,\infty)$.
We can always 'cheat' and add $t$ to the state to make this simplification hold. 

Now, suppose there is some underlying distribution of initial conditions (represented by $X_0$) and we fix a policy $\pi$, then we get a combined stochastic process $(X_t,A_t)_{t\in[0,\infty)}$, which is the random state-action trajectory. An example value that it can take is $(\chi,\alpha)$, where $\chi:[0,\infty)\rightarrow \mathscr X$ and $\alpha:[0,\infty)\rightarrow \mathscr A$. I reiterate that $(\chi,\alpha)$ is an example of a specific state-action trajectory, while $(X_t,A_t)$ is a random variable in $\mathscr S\times \mathscr A$ representing the random state and action of the robot at time $t$.

<aside class=aside-center>
In practice, the roboticist may only be able to specify $p_{A_{t+\varepsilon}|X_t}(a|x)$ due to latency issues! Since doing model inference takes an $\varepsilon >0$ amount of time, it is impossible to act at time $t$ based on the information at $t$. Do you (presumably a human) also operate on such a latency? In your case, $\varepsilon$ is perhaps the time delay between when your <a href=https://www.teamfortress.com class=accented>Team Fortress 2</a> enemy first appears on-screen to when you begin moving the reticle towards their head. It is impressively small!
</aside>

## <span class=tertiary>␥</span> Reward Maximization

Suppose the robot gets the instantaneous reward $R(x,a)$ for being in state $x$ and taking action $a$.

Since we can change the policy, and the trajectory-distribution depends on the policy, we can change the trajectory-distribution $p_{X_{[0,\infty)}}$.