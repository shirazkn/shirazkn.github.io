---
title: "Measure-theoretic Probability"
date: 2023-05-11T07:40:56-07:00
draft: true
---

Probability theory is one of those subjects that's both -- easy to get started with, and hard to master. In particular, the conditional expectation operation $\mathbb E[{}\cdot{}\mathrel|{}\cdot{}]$ can be notoriously tricky to work with, and its properties are not well-understood by researchers in my field who might *want* and *need* to use it to prove important results. What I have on offer in this post is a sneak peek into the rigorous framework upon which modern-day probability theory is built. I personally find this to be an illuminating way to think about randomness. To some extent, it demystifies what it means for a mathematical object to be random.
<!-- It's allowed me to understand and reason about *weird* random variables (more on that in a later post) which may not be as easy to grapple with an elementary understanding of probability. -->

I would call a treatment of probability theory as *mathematically rigorous* if it starts with explicitly-stated axioms, so that everything else follows naturally.
Any rigorous treatment of probability theory begins with a *<span class=accented>probability space</span>*. A probability space is the tuple $(\Omega, \mathcal F, P)$, which has $3$ ingredients:

- $\Omega$ is a <span class=accented>set</span>
- $\mathcal F$ is a <span class=accented>set of subsets</span> of $\Omega$
- $P$ is a <span class=accented>function</span>, $P:\mathcal F \rightarrow [0,1]$

The probability space, $(\Omega, \mathcal F, P)$, can be thought of as some underlying source of randomness (say, God playing dice) on which other random variables can be defined. Here is the most intuitive interpretation of a probability space:

- $\Omega$ is a <span class=accented>set of *outcomes*</span>, which model the different eventualities that are possible (for e.g., the outcome of a throw of two dice: $\lbrace 1, 4 \rbrace \in \Omega$)

- $\mathcal F$ is a <span class=accented>set of *events*</span>, where each *event* is a set of outcomes. For e.g., the event that the dice add up to $5$, which is the subset $\left\lbrace \lbrace 1, 4 \rbrace, \lbrace 2, 3 \rbrace \right\rbrace \subseteq \Omega$

 - $P$ <span class=accented>assigns a probability</span> (number between $0$ and $1$) to each event in $\mathcal F$

Note that we do not assign probabilities to the elements of $\Omega$ directly, but only to the subsets of $\Omega$ which are in $\mathcal F$.
This interpretation seems intuitive enough, but maybe a more formal description may of interest to us. 
In what follows, we do not care what the set $\Omega$ contains (it may or may not be God playing dice; perhaps this is the agnostic approach to doing probability).

### Probability Space

The tuple $(\Omega, \mathcal F, P)$ is a probability space, where

- $\Omega$ is a <span class=accented>set</span>

- $\mathcal F$ is a <span class=accented>$\sigma$-algebra</span>, which is a set of subsets of $\Omega$ satisfying certain properties

- $P\colon \mathcal F \rightarrow [0, 1]$ is a function satisfying certain properties, called a <span class=accented>probability measure</span>

Choosing a [$\sigma$-algebra](https://en.wikipedia.org/wiki/Σ-algebra) is a way of *picking* which events (i.e., subsets of $\Omega$) we would like to assign probabilities to. <!-- The other subsets of $\Omega$ (which are not in $\mathcal F$) may be too messy to work with, such that assigning probabilities to these messy subsets may yield unintuitive results. The $\sigma$-algebra $\mathcal F$ contains *nice* subsets of $\Omega$ that may have nice topological (or otherwise) properties. --> Because of the properties we impose on a $\sigma$-algebra, it always contains the empty set, $\emptyset$, and the complete set, $\Omega$. Thus, $\lbrace \emptyset, \Omega \rbrace$ is the smallest possible $\sigma$-algebra. Rather than *smallest*, we say that this is the *coarsest* $\sigma$-algebra.
<!-- It represents a deterministic random variable, since regardless of the outcome $\omega \in \Omega$, we consider it to be the same event.  -->

The other extreme case is that of the *finest* $\sigma$-algebra, one that we cannot chop up into smaller pieces. When $\Omega$ has countably many elements, the power set (i.e., the set of all the subsets) of $\Omega$, $\mathcal P(\Omega)$, is what's called the *discrete* $\sigma$-algebra. It is the finest $\sigma$-algebra on $\Omega$. In particular, $\mathcal P(\Omega)$ includes singleton sets of the form $\lbrace \omega \rbrace$ where $\omega \in \Omega$ is an outcome, which means that we can assign a probability to each outcome. This is similar to how we use 'probability mass functions' in classical probability theory. 

<!-- We run into issues when $\Omega$ has uncountably many elements. Suppose $X$ is the uniform random variable on the domain $(0,1]$. We assign probabilities to events such as $X\in(-0.49, 0.51]$, but not to the specific outcome, $X=0.5$. -->

A [measure](https://en.wikipedia.org/wiki/Measure_(mathematics)) is a function that maps the sets in $\mathcal F$ to non-negative real numbers, almost like it is 'weighing' or 'measuring' each set in $\mathcal F$. <span class=accented>Probability measures</span> fall into a sub-category of measures -- they take sets to a real number between $0$ and $1$. Think of them as *assigning probabilities to events*. Recall that probability density functions are special functions that integrate to $1$. Analogously, we have $P(\Omega)=1$. Terrence Tao has an excellent [blogpost](https://terrytao.wordpress.com/2009/01/01/245b-notes-0-a-quick-review-of-measure-and-integration-theory/) that goes over measure theory (and in fact, another that covers probability theory far better than I will be able to 😃).

#### Technical Issue: <span class=accented>Measurability</span>

You might wonder why we don't just set $\mathcal F$ to be the power set of $\Omega$, $\mathcal P(\Omega)$. While this works just fine when $\Omega$ has countably many elements, [some technical issues](https://stats.stackexchange.com/questions/199280/why-do-we-need-sigma-algebras-to-define-probability-spaces) arise when $\Omega$ has uncountably many elements.

To see why we might be forced to discard some of the subsets of $\Omega$ when $\Omega$ is uncountable, consider $\Omega=(0,1]$. Suppose we want to turn this into a probablity space, $((0,1], \mathcal F, P_U)$, where $P_U$ is the measure satisfying $P_U\left((a, b]\right)= b-a$. If we can pick such a $P_U$, the corresponding probability space would define the uniform random distribution on $(0,1]$. 
<!-- When we are doing integration, for instance, in introductory calculus classes, we are secretly working with the Lebesgue measure, which turns out to be the most 'natural' measure. -->

Unfortunately, there exist wicked subsets of $(0,1]$ such as the [Vitali set](https://en.wikipedia.org/wiki/Vitali_set), to which $P_U$ is unable to assign a measure (i.e., we can try to assign a value to $P_U(\textrm{Vitali Set})$, but it would immediately lead to a contradiction). The Vitali set is said to be non-measurable. Thus, $\sigma$-algebras are also called as *measurable* subsets of $\Omega$. We should be able to equip a $\sigma$-algebra with a well-defined measure without leading to contradictions.

<!-- The [axioms](https://en.wikipedia.org/wiki/Σ-algebra#Definition_and_properties) which a $\sigma$-algebra should satisfy are surprisingly straightforward. Mathematicians like cleaning things up at the end of the day. It is unthinkable that an entire field of mathematics (probability) could be founded on messy definitions with many edge cases. -->

<hr> 

## Random Variables
A lot of texts will call $(\Omega, \mathcal F, P)$ as the *underlying probability space*. It is useful for rigorously defining what we mean by randomness, but we seldom deal with $(\Omega, \mathcal F, P)$ directly. Instead, we define a random variable as a <span class=accented>measurable function</span> from $\Omega$ to another space.

$X:\Omega \rightarrow \mathcal X$ is called a <span class=accented>random variable</span>, although it is actually a function, and does not introduce any additional randomness. For instance, suppose we do the following:

1. Throw a die.
2. If the die lands on $1$, $2$, or $3$, place a coin heads-up. Otherwise, place the coin tails-up.

Then, the coin is going to take values of *heads* or *tails* with equal probability, as if it was flipped. But really, the only randomness in this scenario is coming from the throwing of the die (which takes values in $\Omega=\lbrace 1, 2, 3, 4, 5, 6 \rbrace$). The throwing of the die is the so-called underlying probability space, whereas its relationship to the coin is the measurable function. The heads/tails instances of the coin are the random variable, $X$, defined as $X(1)=X(2)=X(3)=\text{Heads}$, and $X(4)=X(5)=X(6)=\text{Tails}$.

We now have two spaces, a probability space $(\Omega, \mathcal F, P)$ and another space $(\mathcal X, \mathcal B)$, where $\mathcal B$ is the set of measurable subsets of $\mathcal X$. We still need to define a measure for the latter space.
The reason we call $X$ a *measurable* function is because it should satisfy the following property: for all $S \in \mathcal B$,

<p>\[X^{-1}(S)\coloneqq \lbrace \omega \in \Omega | X(\omega)\in S \rbrace \in \mathcal F\]</p>

We say that $X$ is $\mathcal F$-measurable, and that $X^{-1}(S)$ is the *pre-image* or the *pullback* of $S$ under $X$. Thus, the definition of $X$ relies not only on the domain and codomain, but also on the corresponding $\sigma$-algebras.
I like having the following picture in mind:


Using $X^{-1}$, we can 'pull back' sets in $\mathcal X$ to sets in $\Omega$, and just measure them using $P$. Thus, we have the measure space $(\mathcal X, \mathcal B, P\circ X^{-1})$, where '$\circ$' denotes the composition of functions. This is why we say that no new randomness was introduced in the definition of $X$, the randomness still comes from the underlying probability space. 

Given a random variable $X$ which maps $(\Omega, \mathcal F)$ to $(\mathcal X, \mathcal B)$, by *the $\sigma$-algebra generated by $X$*, we mean the set

<p>
\[\sigma (X) \coloneqq \lbrace  X^{-1}(S) | S\in \mathcal B \rbrace\]
</p>

which is the smallest $\sigma$-algebra that contains all the pullbacks under $X$. Thus, $X^{-1}({}\cdot{})$ gives the pre-image (almost like an 'inverse') of an element in $\mathcal B$, whereas $\sigma(X)$ is the union of all such pre-images.
<!-- Because $X$ is $\mathcal F$-measurable, we have that $\sigma(X)\subseteq \mathcal F$. -->

#### The Die-Coin Example

Consider our example of the die and the coin from before:

<p>\[
\Omega = \lbrace 1, 2, 3, 4, 5, 6 \rbrace
\]
\[
\mathcal X = \lbrace \text{Heads}, \text{Tails} \rbrace    
\]
\[
X(1) = \text{Heads},\ X(2) = \text{Heads},  \\ \dots, \ X(6) = \text{Tails} 
\]
</p>

where $\Omega$ are the outcomes of the die, and $X$ maps an outcome to the corresponding value taken by the coin.
Then, the $\sigma$-algebra generated by $X$ is 
<p>\[
    \sigma(X) = \lbrace \emptyset,  \lbrace 1, 2, 3 \rbrace,\lbrace 4, 5, 6 \rbrace, \Omega \rbrace
\]
</p>

Note that the set $\mathcal X$  (which is necessarily an element of $\mathcal B$) is the event that either $\text{Heads}$ or $\text{Tails}$ has occurred, which is why $X^{-1}(\mathcal X)=\Omega \in \sigma(X)$. Similarly, $X^{-1}(\emptyset) = \emptyset \in \sigma (X)$. A useful interpretation is to think of $\sigma (X)$ as all of the randomness of $X$, any other random events (i.e., the other subsets of $\Omega$) are discarded because they are not relevant to $X$.

#### The Indicator Random Variable

Given $S\subseteq\Omega$, the indicator random variable $\textbf 1_S:\Omega \rightarrow \lbrace 0, 1\rbrace$ is 

<p>\[
\textbf{1}_S(\omega) = \begin{cases}
\begin{array}{l l}
1 & \text{if }\omega \in S\\
0 & \text{if }\omega \notin S
\end{array}
\end{cases}
\]</p>

Since $\textbf 1_S^{-1}(\lbrace 1\rbrace )=S$ and $\textbf 1_S^{-1}(\lbrace 0\rbrace)=S^\complement$, we have that $\sigma(\textbf{1}_S) = \lbrace \emptyset, S, S^\complement, \Omega\rbrace$.
Thus, we say that the random variable $\textbf 1_S$ is $\lbrace \emptyset, S, S^\complement, \Omega\rbrace$-measurable. In our die-coin example, if we treat $\text{Heads}$ as $1$ and $\text{Tails}$ as $0$, then the random variable $X$ is equivalent (for purposes of doing probability) to $\textbf 1_{\lbrace 1, 2, 3 \rbrace}$. 

<hr>

### Expected Value

The expected value of a random variable $X$ is defined as

<p>\[\mathbb E[X] = \int_{\Omega} X dP \]</p>

where the integral has a specific meaning, which we are yet to define. This integral (called the *Lebesgue integral*) is defined using a step-by-step approach. 

The expectation (or rather, the Lebesgue integral) is first defined for the <span class=accented>indicator random variable, </span> $\textbf 1_S$. We have, $\mathbb E[\textbf 1_S] = \int_{\Omega} \textbf 1_S dP = P(S)$, which is the probability of the event, $S$. For the die-coin example, we have $\mathbb E [\textbf 1_{\lbrace 1, 2, 3 \rbrace}] = P(\lbrace 1, 2, 3 \rbrace)$, which we usually set as $1/2$ if the die (as well as the ensuing 'coin') is unbiased.


Thereafter, we define the expectation for random variables such as $X(\omega)=\sum \limits_i c_i \textbf 1_{S_i}(\omega)$, for which we have

<p>\[
\int_{\Omega} \left(\sum \limits_i c_i \textbf 1_{S_i} \right) dP = \sum \limits_i c_i P(S_i)
\]</p>

This step-by-step approach by which we are defining the integral should remind you of how, in high-school math education, integration is defined using Riemann summation. However, the domain of integration in high-school education is typically $\mathbb R$, which is just one of the many possible choices of $\Omega$. In particular, note that the elements of $\mathbb R$ are ordered (i.e., come before or after one another), but the elements of $\Omega$ can include a chimpanzee, for all we care.

<!-- (The only catch in this definition is that the co-domain of $X$ should have some sort of an addition operation. Moreover, the expectation [may not exist](https://en.wikipedia.org/wiki/Cauchy_distribution), which is when the integral is not defined[^l1].) -->

<!-- So we have painstakingly defined measure-theoretic probability, and the expectation. Until we consider some concrete examples of $X$, it can be difficult to appreciate what's really going on here. -->

The following example should help internalize some of the ideas we just discussed.

#### The 'Deterministic Random Variable'

Let a <span class=accented>deterministic random variable</span> $X$ be defined such that $X(\omega)=k$, i.e., $X(\omega)$ takes the value $k$ for each outcome $\omega \in \Omega$. This is how we can define a deterministic quantity, also called as a *degenerate* or an *almost-everywhere constant* random variable.
Given this definition, we have that $X$ is $\lbrace \emptyset, \Omega \rbrace$-measurable. This is because $X^{-1}(\lbrace k\rbrace) = \Omega$.

We could also write this random variable as $k \textbf{1}_{\Omega}$ if we were clever (which we are). Thus, $\mathbb E[X] = \mathbb E [ k \textbf{1}_{\Omega}] = k P(\Omega) = k$. In other words, the expectation of a deterministic random variable (which always takes the value $k$) is just $k$.

This example also illustrates something that isn't emphasized in classical probability theory: the expectation operation is taken *with respect to* an underlying probability space, $(\Omega, \mathcal F, P)$. Usually, it is implied which probability space is being referred to, which is why the notation of '$\mathbb E[{}\cdot{}]$' does not contain a reference to $(\Omega, \mathcal F, P)$. (At this point, see Theorem 1.6.4 of "Probability Theory" by Rick Durett, which derives a general version of the Markov/Chebychev inequality.)

### Change of Variables

Let's review some of the ideas introduced above, We started with a probability space, $(\Omega, \mathcal F, P)$. We defined a measurable function, $X$, which takes elements in $\Omega$ to elements in some codomain, $\mathcal X$. $\mathcal B$ is a $\sigma$-algebra containing (measurable) subsets of $\mathcal X$. We mentioned that a natural probability measure for $(\mathcal X, \mathcal B)$ is $P \circ X^{-1}$.

Suppose we want to compute the expectation of $f(X)$ for some measurable function $f:\mathcal X \rightarrow \mathcal Y$. An example is $f(X)=(X^2-\mathbb E[X])$, whose expectation is called the variance of $X$. 
Note that $f\circ X:\Omega \rightarrow \mathcal Y$ is a random variable. We can compute its expectation using the <span class=accented>change of variables theorem</span>, which states that

<p>
\[ \mathbb E\big[f(X)\big]= \int_{\Omega} (f\circ X) dP 
=   \int_{\mathcal X} f\ d (P\circ X^{-1}) 
\]
</p>

 To see what's going on here, let's try and build up some intuition. The measure $P\circ X^{-1}$ allows us to measure a set $S\subseteq \mathcal X$ by 'pulling it back' such as $X^{-1}(S)$, where
$X^{-1}(S) \subseteq \Omega$ (by definition) and $X^{-1}(S) \in\mathcal F$ (because $X$ is measurable). The integral

<p>
\[\mathbb E\big[f(X)\big] = \int_{\mathcal X} f\ d \left(P\circ X^{-1}\right)\]
</p>

can be thought of as taking the expectation of $f(X)$ while treating $(\mathcal X, \mathcal B, P\circ X^{-1})$ as the underlying probability space, where $X(\omega)$ is itself treated as an outcome. 

However, this is a theorem, and not a trivial consequence of the definitions. Due to the tendency to treat this result as being trivial, it is also called as [the law of the unconscious statistician](https://en.wikipedia.org/wiki/Law_of_the_unconscious_statistician) or the LOTUS. The LOTUS is used, for instance, to compute the variance of a random variable using its probability density function (pdf), where the pdf plays the role of $P\circ X^{-1}$.

<!-- ### Conditional Expectated Value

The <span class=accented>conditional expectation</span> operation takes a random variable, $X$, a $\sigma$-algebra, $\mathcal F$, and gives a random variable, $\mathbb E[X|\mathcal F]$. Since it is a random variable, it is a measurable function with the same domain and codomain as $X$:

<p>
\[\mathbb E[X|\mathcal F]:\Omega \rightarrow \mathcal X\]
</p>

It is the random variable (whose existence and uniqueness are standard exercises in graduate-level probability classes) which has the following properties:

- Let $Y=\mathbb E[X|\mathcal F]$, then $Y$ is $\mathcal F$-measurable
-  -->


<!-- [^l1]: Connection to $L^1$ and $L^2$ spaces: When the codomain is real-valued, $\mathbb E[X]$ exists if $X \in L^1(\Omega)$, and the variance $\mathbb E[X^2]$ exists (is finite) when $X \in L^2(\Omega)$ (also see [this](/posts/hilbert-spaces)). When $X\in L^2(\Omega)$, we have a Hilbert space, and we can define *projections* between random variables. In this setting, projection becomes equivalent to least-squares estimation. -->