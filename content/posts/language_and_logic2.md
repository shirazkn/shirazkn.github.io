---
title: "The Many Worlds of Logic"
date: 2023-02-05T08:46:18-05:00
# series: ["Language and Logic"]
# description: ""
tags: ["slightly mathematical"]
draft: true
---
In [my earlier post](/posts/language_and_logic1) we suggested that there is no objective notion of 'being logical', that whether an statement is logically sound can depend on one's belief system.
We develop that argument further using the concept of formal systems. 
<!-- Towards the end, we will see why it may be inevitable that natural languages are logically inconsistent. -->

### Formal Systems

An **axiomatization** is an assignment of rules (axioms) such as "<span>two plus two equals five</span>," making up an **axiomatic system** or a **formal system**. If you happen to be within that formal system, then you *must* follow all of the assigned rules.
The choice of axioms dictates the degree of expressiveness that one has within the formal system. For instance, North Korea has a small number of state-approved haircuts that everyone must choose from. On the other hand, India lets you grow your hair out, cut it short, go bald, whatever. I would say the Indian system is [to a certain degree](https://en.wikipedia.org/wiki/Unlawful_Activities_(Prevention)_Act#Notable_arrests_made_under_the_Act) <span class=accented>more expressive</span> than that of North Korea. 

The system in North Korea hearkens back to that of pre-elementary school mathematics &#8211; there are only the **natural numbers**: $0$, $1$, $2$, $3\dots$ You can add one natural number to another, but don't you dare subtract them! How painfully limiting. Once we *allow* subtraction, we are able to express **negative numbers** such as -$5$. Then comes multiplication, which doesn't seem to introduce any new numbers. 
By middle school, we are allowed the use of division, which grants us a greater degree of expression. We are able to concoct fantastic things such as $2.25$. 

<aside> 
<b>Chess</b>

Not all formal systems are clearly stratified in this way. Consider the system of moves on a chessboard. It allows us to (succinctly) describe and manipulate objects in the world of chess, but it isn't clear whether the system of chess goes 'above' or 'below' some other formal system about numbers.
</aside>

Formal systems which can (to varying extents) characterize the natural numbers include the *Presburger* and *Peano arithmetics* as well as the *Zermelo construction*. These are all formal systems (named after their conceivers) built on different sets of axioms. There is no single *canonical* formal system for describing numbers, but Zermelo's construction, which was based on the theory of *sets*, ended up going a long way in mathematics. In the $1920$s, Zermelo's system was extended (similar to how we extended the integers to the rationals, above) to the **[Zermelo-Fraenkel set theory](https://en.wikipedia.org/wiki/Zermelo–Fraenkel_set_theory)**, often touted as [being the foundation of modern mathematics](https://lawrencecpaulson.github.io/2022/01/26/Set_theory.html), as it captures just about every mathematical concept that we come across in school. To see just how pedantic and crazy mathematicians are (I mean that in the most endearing sense), a key addition to the Zermelo-Fraenkel theory over Zermelo's was that we could now [count not just to infinity, but beyond](https://www.youtube.com/watch?v=SrU9YDoXE88). Of course, 21<sup>st</sup> century mathematicians are interested in adding more axioms to this system so that we can find new infinities
<a href="https://www.quantamagazine.org/how-many-numbers-exist-infinity-proof-moves-math-closer-to-an-answer-20210715" class=accented>
<em>in between</em> the existing infinities
</a>[^inf].
It seems as if somebody should stop them from taking this bit any further.

[^inf]: The two infinities being referred to are the sizes of the natural numbers and the real numbers. See Cantor's diagonalization for a surprisingly simple proof of the fact that these sizes are indeed different.

I can't speak for whether we *invented* numbers, but we definitely made up the rules for how they behave.
I guess you could argue that we did make up numbers, but only so far as to <span class=accented>effectively capture the essence and structure of our perceived reality</span>. The natural numbers described by each of the above formal systems works precisely like counting does, $2$ plus $2$ makes a $4$.
Maybe there is such a thing as a 'number' that just *exists* out there, but the numbers we use in our everyday math is the version that was invented by humans. It's Zermelo and Fraenkel's best approximation of what being a number entails. 
Like the cavemen in 
<a href="https://en.wikipedia.org/wiki/Allegory_of_the_cave" class=accented>Plato's allegory</a>,
 we can trace over shadows on the wall, even if we can't see or touch the objects casting these shadows.


Mathematics is certainly not just the study of numbers, though. It can be regarded as the study of *patterns* and *structure* instead.
One begins this process by carefully choosing the axioms so as to best represent the structure that is to be studied, then further structure emerges through the logical inferences that are made about these axioms.

<div>
<figure class=invertible>
<img src=/post-images/axioms_structure.png>
</figure>
</div>

There is a school of thought within mathematics called [logicism](https://en.wikipedia.org/wiki/Logicism), which believes that all of mathematics was founded on logic, <span class=accented>logical inference was the glue that held axioms together to form theorems</span>. More specifically, they believed that mathematical truths could be proved using the one-two punch of axioms and logical inference; after all, that is all there is to mathematics. David Hilbert was at the helm of this movement in the $1920$s. Hilbert is best known for posing [a series of unsolved problems](https://en.wikipedia.org/wiki/Hilbert%27s_problems). Most of Hilbert's problems were conjectures that mathematicians *felt* were true, but had neither been able to prove nor disprove yet. One of these conjectures was that all of mathematics can be founded on logic.


<aside class=aside-right>
<b>Law of the Excluded Middle</b>

An example of what theorems in zeroth-order logic look like is
<a href="https://en.wikipedia.org/wiki/Law_of_excluded_middle" class=gray>the following</a>
, which states
that if some statement $B$ is true, then its negation $\neg B$ (read as 'not $B$') must be false. For example, today is either a Sunday, or it isn't.
So the answer to Shakespeare's question, 
<a href="https://en.wikipedia.org/wiki/To_be,_or_not_to_be" class=gray>"$B$ or $\neg B$"</a>, is in the affirmative.
</aside>

But wait a second, the whole point of this exercise was to figure out how **logic** could itself be defined. After all, logical inference should itself follow rules, else the formal systems based on them would be kind of messy and all over the place.
Well, we *could* define logic as a (pause for effect) formal system! <!-- Some of the most fundamental forms of logical inference can be axiomatized into *zeroth-order logic*. Zeroth-order logic lets us deduce things such as: if $4$ is even, and all even numbers are divisible by $2$, then $4$ is divisible by $2$. Adding more expressive power to this logic gives us *first-order logic*, in which you can say: "These exists a number divisible by $2$." The use of "*there exists*" is not allowed in zeroth-order logic.  -->
The Zermelo-Fraenkel theory (which, recall, underlies most of modern mathematics) is built on [first-order logic](https://en.wikipedia.org/wiki/First-order_logic), which is indeed a formal system. First-order logic comes with, in addition to its axioms, its own rules for logical inference, called [zeroth-order logic](https://en.wikipedia.org/wiki/Propositional_calculus). Zeroth-order logic has its own rules for inference, though at this point we might as well take these inference rules for granted.

Before we continue, it is worth mentioning that some **languages** (but not natural languages like English) can be defined as axiomatic systems too, and there are good reasons for why one might want to do this. **Formal languages** have been used to study  linguistic structures. Alfred Tarski (of the [Banach-Tarski paradox](https://en.wikipedia.org/wiki/Banach–Tarski_paradox) fame) attempted to [define](https://en.wikipedia.org/wiki/Semantic_theory_of_truth) *[truth](https://en.wikipedia.org/wiki/Semantic_theory_of_truth)* using formal languages.
Within the realm of a formal language, one could construct a consistent, bullet-proof definition for *truth* that was free of ambiguity.


Then there are programming languages. Alan Turing introduced the concept of **Turing machines** (which are axiomatic systems) to study the fundamental limitations of computers, laying the foundations for theoretical computer science in a time when the word *[computer](https://en.wikipedia.org/wiki/Computer_(occupation))* referred to a human occupation, not an electronic machine.

<!-- Mathematics is a formal system (built on a formal system (built on a formal system (built on some fundamental rules of inference))). -->

Really a lot seems to be hinging on the mechanism of axioms and logical inference, isn't it? It would be a shame if this mechanism were to have a gaping hole in it...

<!-- (though some prefer to think in terms of *category theory*, the so called [mathematics of mathematics](https://eugeniacheng.com/wp-content/uploads/2017/02/cheng-architecture.pdf)[^1]) -->

<!-- [^1]: Euginia Cheng's book [The Joy of Abstraction](https://www.amazon.com/Joy-Abstraction-Exploration-Category-Theory/dp/1108477224) is in part what motivated me to start a math blog! It is a surprisingly accessible introduction to concepts that are usually only taught to graduate students in math. She compiled part of the book using notes from the category theory class that she teaches at the Art Institute of Chicago. -->

### Axioms of Choice

Let's first ask the question of how one might choose an axiomatic system, and why they might choose one axiom over another. 
Let $A$ be an axiom and $\neg A$ be its negation, i.e., the statement '$A$ is not true'. Clearly, $A$ and $\neg A$ cannot both be axioms as this gives us a contradictory system. It should also have the ability to *prove* things; proofs are how we can be certain that something is true. Proofs help us characterize *truth* within an axiomatic system. So broadly speaking, there are two[^3] characteristics that we would want axiomatic systems to have.

[^3]: An additional requirement may be [soundness](https://en.wikipedia.org/wiki/Soundness#Logical_systems), though from my understanding it is more relevant to discuss soundness when defining *logic*, rather than when defining mathematical systems that employ logic. It is also rather straightforward to build sound mathematical systems and to establish their soundness, so we don't bother with it too much.

<p class="equation-like print">
<span class=accented>CONSISTENCY &#8211; </span>  It should not be possible to prove contradictory statements<br>
</p>
<p class="equation-like print">
<span class=accented>COMPLETENESS &#8211; </span> Anything that we <i>feel</i> is true should be provable<br>
</p>

Another characteristic of a useful axiomatic system is that we are able to *do* something with these axioms. A mathematics based on just $12$ numbers may be sufficient to tell the time, but it would be frustrating to keep scores of football games using this system.

<p class="equation-like print">
<span class=accented>EXPRESSIVENESS &#8211; </span> The axiomatic system should have a rich variety of objects and relationships that we can, for example, use to describe real-world phenomena<cr>
</p>


### The Complete Picture

<!-- <aside>

<b> Decidability </b>

Formal logic is said to be <a href="https://en.m.wikipedia.org/wiki/Decidability_(logic)#Decidability_of_a_logical_system">decidable</a>, i.e., we can decide whether a given statement is 
<span class="code">True</span> or <span class="code">False</span>
, which is a property not even all of mathematics possesses; mathematical systems can have statements that are neither 
<span class="code">True</span> nor <span class="code">False</span> 
&#8211; undecidable statements. This is the content of the infamous <a href="https://en.m.wikipedia.org/wiki/Gödel's_incompleteness_theorems">incompleteness theorems</a> of Kurt Gödel.

</aside> -->



<!-- We use axioms to *prove* theorems. Theorems can prove more theorems, and so it goes. -->

<!-- Propositional logic is easier to deal with. It's more basic, more limited, seems more fundamental in some sense. The following is an example of a proposition we can evaluate using a set of rules:
$$
\begin{align}
\textrm{If }A\Rightarrow B\textrm{ and }B\Rightarrow C
\textrm{, then }A\Rightarrow C
\end{align}
$$
where '$A \Rightarrow B$' is to be interpreted as '$A$ being true always means that $B$ is also true'.  -->

<!-- Mathematicians love giving a simple example at this point, usually [something about the weather](https://en.wikipedia.org/wiki/Propositional_calculus); I'll choose to give one where it's easier to go from statement $A$ to $C$ through $B$ than directly:
$$
\begin{align*}
A&:\textrm{ It's snowing}\cr
B&:\textrm{ I drive to campus}\cr
C&:\textrm{ I get to campus faster than usual}
\end{align*}
$$
The premise here is that I usually walk to campus. With that information, if I tell you $A\Rightarrow B$ 
(<span>if it's snowing, I drive to campus</span>) 
and $B\Rightarrow C$ (if I drive to campus, I get there faster), it is indeed true that $A\Rightarrow C$ (if it is snowing, I get to campus faster!?).  -->

<!-- ($1$) has a surprisingly useful visual interpretation as well. -->

<!-- to add: 
does language follow logic? statistically maybe, entropy (3b1b), tai-danae's paper, monte carlo, 
... but then anything with even the slightest amount of regularity is mathematical.
incompleteness theorems as languages.. -->

<!-- however, languages are informal, allow statements like this sentence is false. -->
<!-- Aside: would a language that is expressive enough to encapsulate mathematical logic be incomplete?
language allows us to transcend mathematical systems. -->
Takashi Tokeida's paradox about propositional logic (contravariance)


<hr>

Before we close, I should do my due diligence and note that, while formal languages can be used to discuss natural languages, the latter fall under the category of *informal languages* and may not have a definable notion of truth. In fact, Tarski explicitly warned against the extension of his ideas to natural languages. [Tarski\'s critics](https://pca.st/oq41guck) also stress on the distinction between mathematical truth and metaphysical truth.

Nonetheless, I would think that the mathematical (or more precisely, the axiomatic) approach to defining truth is as clean and air-tight a characterization of truth as we can hope to achieve. We just need to bear in mind that we aren't here to establish a singular meaning for the word *truth*, but to appreciate the intricacies involved in defining *truth* and *logic*. The self-reference in trying to arrive at the *true* definition of *truth* shall not be lost on us.