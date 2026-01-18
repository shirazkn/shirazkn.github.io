---
title: "Measure-theoretic Probability"
date: 2024-05-11T07:40:56-07:00
draft: true
summary: Probability theory is one of those subjects that's both easy to get started with and hard to master. What follows is a semi-rigorous review of the framework upon which modern-day probability theory is built. The goal here is to demystify what it means for a mathematical object to be random.
---

Probability theory is one of those subjects that's both -- easy to get started with and hard to master. For instance, the conditional expectation operation $\mathbb E[\,\cdot\,|\,\cdot\,]$ can be notoriously tricky to work with, and its properties are not well-understood by researchers in my field who might *want* and *need* to use it to prove important results. What follows is a semi-rigorous review of the framework upon which modern-day probability theory is built. I personally find this to be an illuminating way to think about randomness.
The goal here is to demystify what it means for a mathematical object to be random, and to have a rigorous axiomatic understanding of operations such as the conditional expectation.
<!-- It's allowed me to understand and reason about *weird* random variables (more on that in a later post) which may not be as easy to grapple with an elementary understanding of probability. -->

## Probability Space
Any rigorous treatment of probability theory begins with a *<span class=accented>probability space</span>*. A probability space is the tuple $(\Omega, \mathscr F, P)$, which has three ingredients:

- $\Omega$ is a <span class=accented>set</span>
- $\mathscr F$ is a <span class=accented>set of subsets</span> of $\Omega$
- $P$ is a <span class=accented>function</span> that measures subsets, $P:\mathscr F \rightarrow [0,1]$.

The probability space $(\Omega, \mathscr F, P)$ can be thought of as some underlying source of randomness (say, God playing dice) on which other random variables can be defined. Here is the most intuitive interpretation of a probability space:

- $\Omega$ is the <span class=accented>set of all outcomes</span>, i.e., the different eventualities that are possible. For e.g., if we throw two dice, one after another, then a potential outcome is $(1, 4) \in \Omega$.

- $\mathscr F$ is a <span class=accented>set of events</span>, where each *event* is a set of outcomes. For e.g., the event that the dice add up to $5$ is the subset $$\left\lbrace (1, 4), (2, 3), (3, 2), (4,1) \right\rbrace \subseteq \Omega.$$

 - $P$ <span class=accented>assigns a probability</span> (number between $0$ and $1$) to each event in $\mathscr F$.

Note that we do not assign probabilities to the elements of $\Omega$ directly, but only to the subsets of $\Omega$ which are in $\mathscr F$.
This all seems intuitive enough, but a more formal description is due. 
In what follows, we will not concern with what the set $\Omega$ actually contains, taking a more agnostic approach.

The tuple $(\Omega, \mathscr F, P)$ is called a <span class=accented>probability space</span> if

- $\Omega$ is a <span class=accented>set</span>

- $\mathscr F$ is a <span class=accented>$\sigma$-algebra</span>, i.e., a set of subsets of $\Omega$ satisfying certain properties

- $P\colon \mathscr F \rightarrow [0, 1]$ is a function satisfying certain properties, called a <span class=accented>probability measure</span>.

Choosing a [$\sigma$-algebra](https://en.wikipedia.org/wiki/Σ-algebra) is a way of *picking* which events (i.e., subsets of $\Omega$) we would like to assign probabilities to. <!-- The other subsets of $\Omega$ (which are not in $\mathscr F$) may be too messy to work with, such that assigning probabilities to these messy subsets may yield unintuitive results. The $\sigma$-algebra $\mathscr F$ contains *nice* subsets of $\Omega$ that may have nice topological (or otherwise) properties. --> Because of the properties we impose on a $\sigma$-algebra, it always contains the empty set, $\emptyset$, and the complete set, $\Omega$. Thus, $\lbrace \emptyset, \Omega \rbrace$ is the smallest possible $\sigma$-algebra. Rather than *smallest*, we will say that this is the *coarsest* $\sigma$-algebra.[^po] The other extreme case is that of the *finest* $\sigma$-algebra, one that we cannot chop up into smaller pieces. When $\Omega$ has countably many elements, the power set (i.e., the set of all the subsets) of $\Omega$, $\mathcal P(\Omega)$, is what's called the *discrete* $\sigma$-algebra. In particular, $\mathcal P(\Omega)$ includes singleton sets of the form $\lbrace \omega \rbrace$ (where $\omega \in \Omega$ is an outcome), which means that we can assign a probability to each outcome. This is similar to how we use 'probability mass functions' in classical probability theory. 

[^po]: The inclusion operation of sets defines a *partial order* on the power set of $\Omega$, so the term 'coarsest' refers to the minimal element w.r.t. this partial order. In contrast, we usually use the word 'smallest' to refer to the minimal element of some collection w.r.t. cardinality, which defines a *total order* for finite sets (and if you're brave enough, for infinite sets).
<!-- We run into issues when $\Omega$ has uncountably many elements. Suppose $X$ is the uniform random variable on the domain $(0,1]$. We assign probabilities to events such as $X\in(-0.49, 0.51]$, but not to the specific outcome, $X=0.5$. -->

A [measure](https://en.wikipedia.org/wiki/Measure_(mathematics)) maps the sets in a $\sigma$-algebra to the non-negative real numbers, almost like it is 'weighing' or 'measuring' the sets. A [probability measure](https://en.wikipedia.org/wiki/Probability_measure) is a special type of measure that only takes positive values and satisfies $P(\Omega)=1$ (recall that $\Omega\in \mathscr F$ by axiom). Think of the probability measure $P$ as *assigning probabilities*  to the events in $\mathscr F$.  Analogously, we have $P(\Omega)=1$. Terrence Tao has an excellent [blogpost](https://terrytao.wordpress.com/2009/01/01/245b-notes-0-a-quick-review-of-measure-and-integration-theory/) that goes over measure theory (and another one on probability theory).

<!-- This is similar to how a probability density function is a special type of function that integrates to $1$. -->

## Measurability

You might wonder why we don't just set $\mathscr F$ to be the power set of $\Omega$, $\mathcal P(\Omega)$. While this works just fine when $\Omega$ has countably many elements, [some technical issues](https://stats.stackexchange.com/questions/199280/why-do-we-need-sigma-algebras-to-define-probability-spaces) arise when $\Omega$ has uncountably many elements.

To see why we might be forced to discard some of the subsets of $\Omega$ when $\Omega$ is uncountable, consider $\Omega=[0,1]$. Suppose we want to turn this into the probablity space, $([0,1], \mathscr F, P_U)$, where $P_U$ is the uniform probability measure satisfying $P_U\left([a, b]\right)= b-a$. 
Unfortunately, there exist wicked subsets of $[0,1]$ such as the [Vitali set](https://en.wikipedia.org/wiki/Vitali_set), to which $P_U$ is unable to assign a measure (i.e., we can try to assign a value to $P_U(\textrm{Vitali Set})$, but it would immediately lead to a contradiction). The Vitali set is said to be non-measurable. So, we instead let $\mathscr F = \mathcal B([0, 1])$, where $\mathcal B([0, 1])$ is what is called the <span class=accented>Borel $\sigma$-algebra</span> of $[0,1]$; it is defined as the coarsest (i.e., 'smallest') $\sigma$-algebra that contains all the open sets (equivalently, all the closed sets) of $[0,1]$. In this way, the Borel $\sigma$-algebra marries the fields of probability theory and topology with each other, and avoids pathologies like the Vitali set.
The elements of $\mathscr F$ are called the *measurable subsets* of $\Omega$.

<!-- The [axioms](https://en.wikipedia.org/wiki/Σ-algebra#Definition_and_properties) which a $\sigma$-algebra should satisfy are surprisingly straightforward. Mathematicians like cleaning things up at the end of the day. It is unthinkable that an entire field of mathematics (probability) could be founded on messy definitions with many edge cases. -->

<hr> 

## Random Variables
A lot of texts will call $(\Omega, \mathscr F, P)$ as 'the (underlying) probability space'. It is useful for rigorously defining what we mean by randomness, but we seldom deal with $(\Omega, \mathscr F, P)$ directly. Instead, we define a random variable as a <span class=accented>measurable function</span> from $\Omega$ to another space. We refer to a function $X:\Omega \rightarrow \mathcal X$ as a <span class=accented>random variable</span> if it is measurable. You might already have a vague intuition as to why we need the adjective 'measurable' here. First, let's see a simple example:

1. Throw a die.
2. If the die lands on $1$, $2$, or $3$, place a coin heads-up. Otherwise, place the coin tails-up.

The coin is going to take values of $\text{Heads}$ or $\text{Tails}$ with equal probability, as if it were flipped. But really, the only randomness in this scenario is coming from the throwing of the die (represented by the outcomes in $\Omega=\lbrace 1, 2, 3, 4, 5, 6 \rbrace$). The throwing of the die is the so-called underlying probability space. The heads/tails instances of the coin are the random variable, $X$, defined as $X(1)=X(2)=X(3)=\text{Heads}$, and $X(4)=X(5)=X(6)=\text{Tails}$.

We now have two spaces, a probability space $(\Omega, \mathscr F, P)$ and another space $(\mathcal X, \mathscr G)$, where $\mathscr G$ is the set of measurable subsets of $\mathcal X$. We still need to define a measure for the latter space.
The reason we call $X$ a *measurable* function is because it should satisfy the following property: for all $S \in \mathscr G$,

$$X^{-1}(S)\coloneqq \lbrace \omega \in \Omega \mathrel| X(\omega)\in S \rbrace \in \mathscr F$$

We say that $X$ is $\mathscr F$-measurable, and that $X^{-1}(S)$ is the *pre-image* or the *pullback* of $S$ under $X$. Thus, the definition of $X$ relies not only on the domain and codomain, but also on the corresponding $\sigma$-algebras. Using $X^{-1}$, we can 'pull back' sets in $\mathcal X$ to sets in $\Omega$, and just measure them using $P$. This gives us the measure space $(\mathcal X, \mathscr G, P\circ X^{-1})$, where '$\circ$' denotes the composition of functions.

Given a random variable $X$ that maps $(\Omega, \mathscr F)$ to $(\mathcal X, \mathscr G)$, by *the $\sigma$-algebra generated by $X$*, we mean the set

$$
\sigma (X) \coloneqq \lbrace  X^{-1}(S) \mathrel| S\in \mathscr G \rbrace,$$

which is the smallest $\sigma$-algebra that contains all the pullbacks under $X$. Thus, $X^{-1}({}\cdot{})$ gives the pre-image (almost like an 'inverse') of an element in $\mathscr G$, while $\sigma(X)$ is the union of all such pre-images.

#### Example 1. Die $\rightarrow$ Coin

Consider our example of the die and the coin from before:

$$
\Omega = \lbrace 1, 2, 3, 4, 5, 6 \rbrace
$$
$$
\mathcal X = \lbrace \text{Heads}, \text{Tails} \rbrace    
$$
$$
X(1) = \text{Heads},\ X(2) = \text{Heads},  \\ \dots, \ X(6) = \text{Tails} 
$$

where $\Omega$ are the outcomes of the die, $X$ maps an outcome to the corresponding value taken by the coin, and $\mathscr F$ and $\mathscr G$ are just the power sets.
The $\sigma$-algebra generated by $X$ is *not* $\mathscr F$, but rather
$$
    \sigma(X) = \lbrace \emptyset,  \lbrace 1, 2, 3 \rbrace,\lbrace 4, 5, 6 \rbrace, \Omega \rbrace.
$$

For instance, the set $\lbrace \text{Heads}\rbrace\in\mathscr G$ is pulled back to $\lbrace 1, 2, 3\rbrace$; also, don't forget to pull back $\emptyset$ and $\mathcal X$! Even though it was not clear from the definitions, $\sigma (X)$ encodes the randomness of $X$. 

#### Example 2. Indicator Random Variable

Given $S\in\mathscr F$, the indicator random variable $\textbf 1_S:\Omega \rightarrow \lbrace 0, 1\rbrace$ is 

$$
\textbf{1}_S(\omega) = \begin{cases}
\begin{array}{l l}
1 & \text{if }\omega \in S\\
0 & \text{if }\omega \notin S.
\end{array}
\end{cases}
$$

Since $\textbf 1_S^{-1}(\lbrace 1\rbrace )=S$ and $\textbf 1_S^{-1}(\lbrace 0\rbrace)=S^\complement$, we have that $\sigma(\textbf{1}_S) = \lbrace \emptyset, S, S^\complement, \Omega\rbrace$.
Thus, we say that the random variable $\textbf 1_S$ is $\lbrace \emptyset, S, S^\complement, \Omega\rbrace$-measurable. In our die-coin example, if we view $\text{Heads}$ as $1$ and $\text{Tails}$ as $0$, then the random variable $X$ is equivalent (for purposes of doing probability) to $\textbf 1_{\lbrace 1, 2, 3 \rbrace}$. 

<hr>

### Expected Value

The expected value of a vector-valued random variable $X$ is defined as

$$\mathbb E[X] = \int_{\Omega} X dP,$$

where the integral has a specific meaning, which we are yet to define. This integral (called the *Lebesgue integral*) is defined using a step-by-step approach. 

The expectation (or rather, the Lebesgue integral) is first defined for the <span class=accented>indicator random variable, </span> $\textbf 1_S$. We have, $\mathbb E[\textbf 1_S] \coloneq \int_{\Omega} \textbf 1_S dP = P(S)$, which is the probability of the event, $S$. For the die-coin example, we get $\mathbb E [\textbf 1_{\lbrace 1, 2, 3 \rbrace}] = P(\lbrace 1, 2, 3 \rbrace)$, which we usually set as $1/2$ if the die (and the ensuing coin flip) is unbiased.


Next, we define the expectation for random variables constructed as $X(\omega)=\sum \limits_i c_i \textbf 1_{S_i}(\omega)$, for which we have

$$
\mathbb E[X] \coloneq\int_{\Omega} \left(\sum \limits_i c_i \textbf 1_{S_i} \right) dP = \sum \limits_i c_i P(S_i).
$$

Finally, we can let the summation here range over infinite index sets (at least those that are permissible under the axioms of a $\sigma$-algebra).
This step-by-step approach is how most integrals are defined (Riemann, Lebesgue, etc.). Note that the domain of integration in high-school mathematics is typically $\mathbb R$, whose elements can be ordered, added, and multiplied. In contrast, the theory above allows for $\Omega$ to be the set $\lbrace 🦧,🍍,🍎,👠\rbrace$. Nevertheless, we have assumed that the elements of $\mathcal X$ can be added and scaled! So for instance, the die-coin example does not work.[^means]

[^means]: For when the random variable takes values in a Lie group or a manifold, we need to further generalize the notion of the "expectation" to suit our needs. See my paper *"Means of Random Variables in Lie Groups"* for a review of the Lie group case.


<!-- (The only catch in this definition is that the co-domain of $X$ should have some sort of an addition operation. Moreover, the expectation [may not exist](https://en.wikipedia.org/wiki/Cauchy_distribution), which is when the integral is not defined[^l1].) -->

<!-- So we have painstakingly defined measure-theoretic probability, and the expectation. Until we consider some concrete examples of $X$, it can be difficult to appreciate what's really going on here. -->


#### Example 3. Deterministic Random Variable

Let a <span class=accented>deterministic random variable</span> $X$ be defined such that $X(\omega)=k$, i.e., $X(\omega)$ takes the value $k$ for each outcome $\omega \in \Omega$. This is how we can define a deterministic quantity, also called as a *degenerate* or an *almost-everywhere constant* random variable.
Since $X^{-1}(\lbrace k\rbrace) = \Omega$, it follows that $X$ is $\lbrace \emptyset, \Omega \rbrace$-measurable. We could also write this random variable as $k \textbf{1}_{\Omega}$ if we were clever (which we are), since $1_\Omega$ is $\lbrace \emptyset,\Omega\rbrace$-measurable and $\mathbb E[X] = \mathbb E [ k \textbf{1}_{\Omega}] = k P(\Omega) = k$.

This example also illustrates something that isn't emphasized in classical probability theory: the expectation operation is taken *with respect to* an underlying probability space, $(\Omega, \mathscr F, P)$. Usually, it is implied which probability space is being referred to, which is why the notation of '$\mathbb E[{}\cdot{}]$' does not contain a reference to $(\Omega, \mathscr F, P)$. (At this juncture, see Theorem 1.6.4 of *"Probability Theory"* by Rick Durett for an elegant proof of the Markov/Chebychev inequality.)

#### Example 4. Continuous Random Variables

To define a continuous random variable, we will have to let $\Omega$ be uncountably infinite as a set. For instance, imagine $\Omega$ to be the uniform distribution on $(0, 1)$. Given a measurable set $T \in \mathscr G$, where $\mathscr G$ is the $\sigma$-algebra of $\mathcal X$, consider the indicator function $\textbf{1}_{T}$. We can define the composite random variable $\textbf{1}_{T} \circ X = \textbf{1}_{X^{-1}[T]}$ (where $X^{-1}[T]$ is the preimage of $T$). We see that 
$$
\begin{align}
\mathbb E[\textbf{1}_{X^{-1}[T]}] &= \int_\Omega \textbf{1}_{X^{-1}[T]} dP \\
&= P(\,\omega \in X^{-1}[T]\,) = P(\,X(\omega) \in T\,).
\end{align}
$$

Assume we have another integration measure $\lambda$ on $\mathcal X$, for instance, the Lesbesgue or Haar measure.
The Radon-Nikodym theorem tells us that, as long as the induced probability measure on $\mathcal X$ is *absolutely continuous* w.r.t. $\lambda$ (i.e., not like a Dirac delta function), we can define the *probability density function* of $X$ as the function $p$ on $\mathcal X$ that satisfies

$$
\int_{T\subseteq \mathcal X}p(x)\,d\lambda(x) = P(X(\omega)\in T).
$$

Conversely, the specification of such a function defines a random variable on $\mathcal X$. Verify that $p$ integrates to $1$ w.r.t. $\lambda$! 

<aside class=aside-center>This example also shows us why the issue of defining a "uniform distribution" is subtle. Uniform w.r.t. which integration measure? When we said "uniform distribution on $(0, 1)$" earlier, we automatically assumed that the distribution was uniform w.r.t. the Lebesgue measure. Note also that we cannot define a uniform distribution on $\mathbb R$ this way.
</aside>

### Change of Variables

<!-- Let's recap. We started with a probability space, $(\Omega, \mathscr F, P)$. We defined a function, $X:\Omega \rightarrow \mathcal X$. Associated to $\mathcal X$ is $\mathscr G$, a $\sigma$-algebra containing the measurable subsets of $\mathcal X$; we refer to $X$ as a 'random variable' if it pulls back measurable subsets in $\mathscr G$ to measurable subsets in $\mathscr F$. We showed that a natural probability measure for $(\mathcal X, \mathscr G)$ is $P \circ X^{-1}$. -->

Let's generalize what we just did in Example 4.
Suppose we want to compute the expectation of $f(X)$ given another measurable function, $f:\mathcal X \rightarrow \mathcal Y$. An example is $f(X)=(X^2-\mathbb E[X])$, whose expectation is called the variance of $X$. 
Note that $f\circ X:\Omega \rightarrow \mathcal Y$ is a random variable. We can compute its expectation using the <span class=accented>change of variables theorem</span>, which refers to the (hopefully, obvious) fact that

$$\mathbb E\big[f(X)\big]= \int_{\Omega} (f\circ X) \,dP 
=   \int_{\mathcal X} f\ d (P\circ X^{-1}). 
$$

In words, we are taking the expectation of $f(X)$ while treating $(\mathcal X, \mathscr G, P\circ X^{-1})$ as the underlying probability space, where $X(\omega)$ is itself treated as an outcome. This is a theorem, and to some extent a trivial consequence of the definitions. Due to the tendency to take this result for granted, it is sometimes called the [law of the unconscious statistician](https://en.wikipedia.org/wiki/Law_of_the_unconscious_statistician) (LOTUS). 
<!-- The LOTUS is used, for instance, to compute the variance of a random variable using its probability density function (pdf), where the pdf plays the role of $P\circ X^{-1}$. -->

---

## Conditional Expectated Value

Let $E \in \mathscr F$. We can define a new measure $P(\,\cdot\,|E)$ by the property that, given $S \in \mathscr F$

### Conditioning on an Event



The <span class=accented>conditional expectation</span> operation takes a random variable $X$, a $\sigma$-algebra $\mathcal H$, and outputs a random variable, $\mathbb E[X|\mathcal H]$. Note that it is a random variable, a measurable function with the same domain and codomain as $X$. That is,
$
\mathbb E[X|\mathcal H]:\Omega \rightarrow \mathcal X
$.

The conditional expectation is defined (and its existence and uniqueness guaranteed) by the following requirements:

- $\mathcal H$ should be
- Let $Y=\mathbb E[X|\mathcal H]$, then $Y$ is $\mathcal H$-measurable
.
