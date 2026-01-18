---
title: "The Incompleteness Theorems"
date: 2023-02-05T08:46:18-05:00
tags: ["General"]
bgImage: /post-images/axioms_structure.png
summary: I suggested that there is no objective notion of logical truth, that whether a statement is 'true' can depend on the system of truth that one is operating in. Here we will develop that argument further using the concept of axiomatic systems.
---
In [my earlier post](/posts/language_and_logic1) I suggested that there is no objective notion of logical truth, that whether a statement is 'true' can depend on the system of truth that one is operating in.
Here we will develop that argument further using the concept of axiomatic systems. This is a long one, but I'm excited to talk about it!
<!-- Towards the end, we will see why it may be inevitable that natural languages are logically inconsistent. -->

### Axiomatic Systems

An **axiomatization** is an assignment of rules (axioms) such as "<span>one plus one equals two</span>," making up an **axiomatic system** or a **formal system**.
If you happen to be within that formal system, then you *must* follow all of the assigned rules.
The choice of axioms dictates the degree of expressiveness that one has within the formal system. For instance, North Korea has a small number of state-approved haircuts that everyone must choose from, which does not sound like a very expressive system. 

<!-- &#8211; -->
Similarly, in pre-elementary school mathematics you are introduced to the **natural numbers**: $0$, $1$, $2$, $3\dots$ You can add one natural number to another, but don't you dare subtract them! Once we *allow* subtraction, we are able to express **negative numbers** such as -$5$. Then comes multiplication, which doesn't seem to introduce any new numbers. 
By middle school, we are allowed the use of division, which grants us a greater degree of expression. We are able to concoct fantastic things such as $2.25$.

<aside> 
<b>Chess</b>

Not all formal systems are stratified in this way. Consider the system of moves on a chessboard. It allows us to succinctly describe and manipulate objects in the world of chess, but it isn't clear whether the system of chess goes 'above' or 'below' some other formal system about numbers.
</aside>

Formal systems which can (to varying extents) characterize the natural numbers include the *Presburger arithmetic*, *Peano arithmetic*, and the *Zermelo theory*. These are all formal systems named after their respective conceivers. There is no single *canonical* formal system for describing numbers. In fact, different systems capture different properties about the numbers, and we may be interested in exploring these properties and the ensuing mathematical structure. In the $1920$s, Zermelo's system was extended (similar to how we extended the integers to the rationals, above) to the **[Zermelo-Fraenkel (ZF) set theory](https://en.wikipedia.org/wiki/Zermelo–Fraenkel_set_theory)**, often touted as [being the foundation of modern mathematics](https://lawrencecpaulson.github.io/2022/01/26/Set_theory.html), as it captures just about every mathematical concept that we come across in school. To see just how pedantic mathematicians are (I mean that in the most endearing sense), a key addition to the Zermelo-Fraenkel theory over Zermelo's was that we could now [count not just to infinity, but beyond](https://www.youtube.com/watch?v=SrU9YDoXE88). Of course, 21<sup>st</sup> century mathematicians are interested in adding more axioms to this system so that we can find new infinities
<a href="https://www.quantamagazine.org/how-many-numbers-exist-infinity-proof-moves-math-closer-to-an-answer-20210715" class=accented>
<em>in between</em> the existing infinities
</a>[^inf].
It seems as if somebody should stop them from taking this bit any further.

[^inf]: The two infinities of the continuum hypothesis are the sizes of the natural numbers and the real numbers. See <a class=accented href=https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument>Cantor's diagonalization</a> for a proof of the fact that these sizes are indeed different, one of those profound-yet-accessible proofs in math. Incidentally, the mathematical tool used in proving Gödel and Tarski's theorems is named the [diagonal lemma](https://en.wikipedia.org/wiki/Diagonal_lemma) for its resemblance to Cantor's diagonalization.

I can't speak for whether we *invented* numbers, but we definitely made up the rules for how they behave.
I guess you could argue that we did make up numbers, but only so far as to <span class=accented>effectively capture the essence and structure of our perceived reality</span>. The natural numbers described by each of the above formal systems works precisely like counting does, $1$ plus $2$ makes a $3$. <!-- We (humans) decided that what we define as 'numbers' should capture such relationships. -->
Maybe there is such a thing as a 'number' that just *exists* out there, but the numbers we use in our everyday math is the version that was invented by humans. It's Zermelo and Fraenkel's best approximation of what being a number entails. 
Like the cavemen in 
<a href="https://en.wikipedia.org/wiki/Allegory_of_the_cave" class=accented>Plato's allegory</a>,
 we can trace over shadows on a wall, even if we can't see or touch the objects casting these shadows.


Mathematics is certainly not just the study of numbers, though. It can be regarded as the study of *patterns* and *structure* instead.
One begins this process by carefully choosing the axioms so as to best represent the structure that is to be studied, then further structure emerges through the logical inferences that are made about these axioms. Different mathematical fields can emerge from different sets of axioms. For example, the axioms we use to define ordinary numbers tell us how to count sheep ($6$ sheep $+$ $8$ sheep $=$ $14$ sheep), but we could also lay down axioms that make $6+8$ equal $2$, so that we can describe how to count hours on a clock! For doing probability we could use the [Kolmogorov axioms](https://en.wikipedia.org/wiki/Probability_axioms), for geometry there's Euclid's axioms, for [group theory](https://www.youtube.com/watch?v=mvmuCPvRoWQ) we have group axioms, and so on.

<div>
<figure class=invertible>
<img src=/post-images/axioms_structure.png>
</figure>
</div>

There is a school of thought within mathematics called [logicism](https://en.wikipedia.org/wiki/Logicism), which believes that all of mathematics was founded on logic --- <span class=accented>logical inference was the glue that held axioms together to form theorems</span>. More specifically, they believed that any mathematical truth could be proved using the one-two punch of  <span class=accented>axioms</span> and  <span class=accented>logical inference</span>. The mathematician David Hilbert was at the helm of this movement in the $1920$s. Hilbert is perhaps best known for posing [a series of unsolved problems](https://en.wikipedia.org/wiki/Hilbert%27s_problems) in mathematics, most of which were conjectures that mathematicians *felt* were true, but had neither been able to prove nor disprove yet. One of these conjectures was that all of mathematics can be founded on logic.

But wait a second, the whole point of this exercise was to figure out how **logic** could itself be defined. After all, logical inference should itself follow rules, else the formal systems based on them would be kind of messy and all over the place.
Well, we could define **logic** as being a formal system unto itself!
The Zermelo-Fraenkel theory (which, recall, is the formal system underlying most of modern mathematics) is built on [first-order logic](https://en.wikipedia.org/wiki/First-order_logic), which is indeed a formal system. First-order logic comes with, in addition to its axioms, its own formal system for logical inference, called <span class=accented>zeroth-order logic</span> or [propositional logic](https://en.wikipedia.org/wiki/Propositional_calculus).

<!-- <aside class=aside-right>
<b>Law of the Excluded Middle</b>

An example of what reasoning in zeroth-order logic looks like is
<a href="https://en.wikipedia.org/wiki/Law_of_excluded_middle" class=gray>the following</a>: If some statement $B$ is true, then its negation $\neg B$ (read as 'not $B$') must be false, and vice versa. This means that either $B$ or $\neg B$ must be true. This is what the method of 'proof by contradiction' relies on. (Please note the <a href="https://en.wikipedia.org/wiki/To_be,_or_not_to_be" class=gray>cheeky Shakespearean pun</a>.)
</aside> -->

Before we continue, it is worth mentioning that some languages (but not natural languages like English) can be defined as axiomatic systems too, and there are good reasons for why one might want to do this. <span class=accented>**Formal languages**</span> have been used to study linguistic structures. Alfred Tarski (of the [Banach-Tarski paradox](https://www.youtube.com/watch?v=s86-Z-CbaHA) fame) also attempted to define *[truth](https://en.wikipedia.org/wiki/Semantic_theory_of_truth)* using formal languages, noting that using a formal language one could construct a consistent, fool-proof definition for *truth* that was free of ambiguity.

Then there are **programming languages**. Alan Turing introduced the concept of *Turing machines* (which are axiomatic systems) to study the fundamental limitations of computers, laying the foundation for all of theoretical computer science. Amazingly, he did so in a time when the word *[computer](https://en.wikipedia.org/wiki/Computer_(occupation))* referred to a human occupation, not an electronic machine. We'll revisit both Tarski and Turing's works later in this post.

<!-- (though some prefer to think in terms of *category theory*, the so called [mathematics of mathematics](https://eugeniacheng.com/wp-content/uploads/2017/02/cheng-architecture.pdf)[^1]) -->

<!-- [^1]: Euginia Cheng's book [The Joy of Abstraction](https://www.amazon.com/Joy-Abstraction-Exploration-Category-Theory/dp/1108477224) is in part what motivated me to start a math blog! It is a surprisingly accessible introduction to concepts that are usually only taught to graduate students in math. She compiled part of the book using notes from the category theory class that she teaches at the Art Institute of Chicago. -->

### Choosing the Axioms

Let's ask the question of how one chooses an axiomatic system. What kind of axioms would we want for our system?
Suppose $A$ is an axiom and $\neg A$ is its negation, i.e., the statement '$A$ is not true'. Clearly, $A$ and $\neg A$ cannot both be axioms as this gives us a contradictory system. So we have our first requirement:

<p class="equation-like print">
<span class=accented>CONSISTENCY &#8211; </span>  It should not be possible to prove contradictory statements<br>
</p>

We should also have the ability to *prove* things within an axiomatic system. Proofs (or disproofs) are how we can be certain that something is true (or false). Those unsolved problems that Hilbert posed? Surely, any good axiomatic system will have either a proof or a disproof of each of the conjectures. Anything that is proved, we can call a theorem. If a conjecture gets disproved instead, we can negate it and call *that* a theorem. That is ideally how we would like to do mathematics.

<p class="equation-like print">
<span class=accented>COMPLETENESS &#8211; </span> A given (logically meaningful) statement should admit either a proof or a disproof<br>
</p> 

Finally, a characteristic of a useful axiomatic system is that we are able to *do* something with these axioms. A [mathematics based on just $12$ numbers](https://en.wikipedia.org/wiki/Modular_arithmetic) may be sufficient to tell the time, but there are many situations where we would like to count past 12. This leads us to the very subjective stipulation which we call *expressiveness*.
<!-- 
[^3]: An additional quality that we desire of an axiomatic system is [soundness](https://en.wikipedia.org/wiki/Soundness#Logical_systems), though from my understanding it is more relevant to discuss soundness when defining *logic*, rather than when defining mathematical systems that employ logic. It is also rather straightforward to build sound mathematical systems and to establish their soundness, so we don't bother with soundness too much. -->

<p class="equation-like print">
<span class=accented>EXPRESSIVENESS &#8211; </span> The axiomatic system should have a variety of objects and relationships that we can, for example, use to describe real-world phenomena<cr>
</p>

We now have all the background needed to get into the meat of this post.

<hr>

### Gödel's Incompleteness Theorems

The mathematician Kurt Gödel was able to show, around a 100 years ago, that no axiomatic system can have all three of these qualities. Specifically, he showed that <span class=accented>any axiomatic system (that is expressive enough to do [basic arithmetic](https://en.wikipedia.org/wiki/Robinson_arithmetic)) is either incomplete or inconsistent</span>. This is called Gödel's first incompleteness theorem.

#### Implications in Mathematics

Let's think about what this means. Suppose we design an axiomatic system that is sufficiently expressive (can do basic computations, like add one thing to another to give two things). Either there are some *true* statements in it which cannot be proved using the axioms (incompleteness), or there exist contradictory statements in it, each of which can be proved using the axioms (inconsistency). In fact, the latter case, inconsistency, is far worse, and pretty much a deal-breaker. A single contradiction can suspend all credibility of an axiomatic system, because [in a contradictory axiomatic system one can "prove" just about anything](https://www.nku.edu/~longa/classes/mat385_resources/docs/russellpope.html). That's bad! We don't want to have one mathematician prove that $2$ plus $2$ equals $5$, another prove that it doesn't, and have no grounds for deciding who's right. So it's looking like we'd rather mathematics be **incomplete** (i.e., missing some things) than **inconsistent** (i.e., self-contradictory).

It turned out that at least one of Hilbert's unsolved problems could neither be proved nor disproved, namely the [continuum hypothesis](https://www.youtube.com/watch?v=SrU9YDoXE88) (which conjectured that there is no set that is bigger than the integers and smaller than the real numbers). There was absolutely nothing that the Zermelo-Fraenkel ($ZF$) system could say definitively about this conjecture. So then what do we do with the continuum hypothesis ($CH$)? Does it not have a place in mathematics? Well, we could assume $CH$ is true and adopt it as a new axiom. We could also assume that it is false (which we write as '$\neg CH$') and adopt *that* as an axiom instead. Adding an axiom like this comes with its consequences, though. For instance, adding $C$ (the [axiom of choice](https://en.wikipedia.org/wiki/Axiom_of_choice)) to $ZF$ leads to the implication of the [Banach-Tarski paradox](https://www.youtube.com/watch?v=s86-Z-CbaHA). Put simply, this means that geometry can have non-intuitive ('weird') properties in $ZFC$. So we want to double-check whether we indeed want geometry to behave in this way, before adding $CH$ (or $\neg CH$) as an axiom to $ZF$. 
<!-- Analogously, we would not want our axiomatic system to have $1+1=1$ be true within it, because that's not how we want numbers to behave; it defeats the purpose of defining natural numbers as a way of counting things. -->

Mathematicians were able to show that adding $CH$ at least does not immediately make $ZF$ or $ZFC$ inconsistent, but that's another possibility we should consider before adding new axioms. Given a choice, we'd rather be incomplete than inconsistent.
<!-- So $ZF$ is consistent if and only if $ZF + CH$ (or equivalently, $ZF + \neg CH$) is consistent; we say that $CH$ is independent of $ZF$. -->

#### Reasons for Incompleteness

There are axiomatic systems which are indeed consistent and complete, and first-order logic is one of them! This is the content of the lesser known <span class=accented>Gödel's completeness theorem</span> (although there are differences in what "[completeness](https://en.wikipedia.org/wiki/Completeness_(logic))" refers to in these theorems).
The incompleteness theorems require us to first qualify how *expressive* a system is, before we can say anything about its incompleteness. So let's now look at when and why a given axiomatic system, be it language, logic, or mathematics, comes under the purview of the incompleteness theorems.

<b class=accented>Infinity / Recursion</b>: Observe that, if an axiomatic system has only finitely many statements in it, we can just enumerate through all of its statements and check whether they're true. Sort of like a brute force proof. A brute force proof in a system with infinitely many 'things' in it either <span class=accented>may</span> or <span class=accented>may not</span> terminate (see the [four color theorem](https://en.wikipedia.org/wiki/Four_color_theorem) and the [Riemann hypothesis](https://www.youtube.com/watch?v=zlm1aajH6gY), respectively, for examples of either case.)

Alan Turing's work involved the study of programming languages, or rather, the computer algorithms that can be written using them. He showed that <span class=accented>no computer program can decide</span> (i.e., determine with certainty) <span class=accented>whether another computer program halts</span> (i.e., terminates, as opposed to getting stuck in an infinite loop). This is called the halting problem, and it is said to be <span class=accented>undecidable</span>. Here, undecidable only means that there is no *effective* algorithm to solve the halting problem. Similarly, Gödel's theorem says nothing about the (non-)existence of infinitely long proofs. It just says that there are statements that do not have *finite* proofs, but the word *finite* is typically omitted while stating the incompleteness theorems. (At this point, I would implore the reader who is familiar with Cauchy's completeness in metric spaces to compare the two uses of the term 'completeness' 😃)

It seems like it is necessary and sufficient for an axiomatic system to have some notion of 'infinitely many things' in it for Gödel's theorems to apply. But this isn't quite the case either. [Robinson arithmetic](https://en.wikipedia.org/wiki/Robinson_arithmetic) is an incomplete axiomatic system that can be generated using finitely many axioms. On the other hand, [Tarski\'s theory of real closed fields](https://en.wikipedia.org/wiki/Real_closed_field) is a complete and decidable axiomatic system that characterizes the infinitely large set of real numbers[^tarski].

[^tarski]: The fact that there exists a Gödel-complete axiomatization of the real numbers should come as a surprise. Surely, any axiomatization of the reals must be more expressive than the so-called 'basic arithmetic' that Gödel's theorems apply to, right? The reason why Tarski's axiomatization of the reals is complete is because it cannot do the basic arithmetic that is stipulated in Gödel's theorems. While Tarski's axiomatization captures the properties of the reals, it does not have what it takes to define integers and their arithmetic properties. (Think of a number line that does not have any markings on it!) In fact, if one so much as introduces a $\sin$ function into this axiomatization, it [becomes undecidable](https://en.wikipedia.org/wiki/Decidability_of_first-order_theories_of_the_real_numbers), because the $\sin$ function indirectly allows us to encode integer arithmetic within the system.

As a segue, consider the following block of (Python) code, which prints infinitely long strings of letters:
```python {linenos=true}
def recursive_function(x):
    print(x)
    recursive_function(x)
```
The function above takes some input `x` and uses what programmers call 'self-reference' to print the object `x` infinitely many times on the screen, indicating that self-reference has the potential to generate infinitely many things. This is a hint at the fact that self-reference, and not infinitude, may be the deeper reason for incompleteness.

<b class=accented>Self-Reference</b>: 
A universal feature of axiomatic systems where Gödel-like incompleteness theorems do apply is that these systems are capable of <span>**self-reference**</span>. Self-reference leads to what we call in common parlance *paradoxes*. A well-known example of a paradox arising from self-reference is "<span class=accented>This statement is false</span>"; we can't assign a truth value to this statement without arriving at a contradiction, exactly as in Gödel's theorem.
Another well-known paradox from mathematics (which is of historical significance) is <a href=https://en.wikipedia.org/wiki/Russell%27s_paradox class=accented>Russel's paradox</a>, which asks <span class=accented>whether the set that contains all the other sets contains itself</span>. Russel's paradox showed that 'naive set theory' (one in which you can even posit the existence of such a 'set of all sets') is inconsistent. <!-- The paradox is partially resolved by accepting that such a set cannot be constructed, even if the statement presupposes that it can.  Russel's paradox predates Gödel's work, and was the first nail in the coffin for logicism. --> 

The '[Barber paradox](https://en.wikipedia.org/wiki/Barber_paradox)' is a more prosaic way of asking the same question: <span class=print>There is a village that has only one barber, who shaves those (and only those) who do not shave themselves. Does the barber shave themself?</span>[^barb] 

[^barb]: The barber in the Barber paradox appears to be a special person whom the rule does not apply to. This is similar to how the 'set' in Russel's paradox cannot be treated as just any other set, but perhaps we could give it [another name](https://en.wikipedia.org/wiki/Class_(set_theory)) in order to avoid self-reference, and thus avoid contradiction.

[A lot of Gödel-like theorems use proof by contradiction](https://www.quantamagazine.org/how-godels-incompleteness-theorems-work-20200714/), where the contradiction arises from self-reference. Turing's proof of the undecidability of the halting problem involves giving a computer program a version of itself as the input. These proofs are usually surprisingly accessible, you could [watch this video](https://www.youtube.com/watch?v=wGLQiHXHWNk) if you're curious.

<!-- As you add expressiveness to a formal system (via axioms), at some point it becomes expressive enough for the incompleteness theorems to hold. -->

#### The Second Incompleteness Theorem

Okay, so many our axiomatic systems are incomplete, including mathematics. That might be a good thing, right? At least they aren't inconsistent? Well, the *second* of Gödel's incompleteness theorems states that <span class=accented>a sufficiently expressive consistent system cannot prove its own consistency</span>! As we already know that $ZF$ is incomplete (by the first incompleteness theorem), it is guaranteed that $ZF$ has some unprovable statements. One of these unprovable statements is that of its own consistency.


Recall that (someone named) Tarski tried to define *truth* using axiomatic systems. In the last post, I had conflated between the concepts of *truth* and *consistency*. There is indeed a version of the second incompleteness theorem that swaps *consistency* out for *truth*.
<a href=https://plato.stanford.edu/entries/goedel-incompleteness/#TarTheUndTru class=accented>Tarki's undefinability theorem</a> says that the concept of truth in a formal system cannot be defined *within* that system. Tarski's proof of the undefinability theorem mostly relies on self-reference, rather than on recursion as many other Gödel-like proofs do. It is also about formal systems in general, and not about mathematics. 
Owing to this fundamentality of Tarski's theorem, the mathematician [Raymond Smullyan](https://en.wikipedia.org/wiki/Raymond_Smullyan) showed in $1957$ that Gödel's incompleteness theorems can be applied [to many more formal systems](https://www.jstor.org/stable/2964058) than was believed in Gödel's time. For these reasons, Smullyan also espouses that Tarski's work should get much of the attention that Gödel's does.

<!-- So how then, did Tarski define truth to begin with? How are Gödel, Turing, and the others able to prove all these weird results about the very nature of provability within axiomatic systems?  -->
It seems like the study of consistency (or provability, truth, etc.) should itself be privy to the problem of self-reference, since we say that a formal system is unable to prove *its own* consistency. For that matter, the second incompleteness theorem is phrased a bit peculiarly; it doesn't preclude the possibility that one formal system can prove the consistency of another.

<hr>

### Transcending Language using Metalanguage
 <!--  Like if we prove some theorem about the real numbers, it will tell us something deep about the natural numbers, allowing us to say things about the natural numbers without ever having to deal with them directly. -->
As opposed to proofs *in* a formal system, proofs *about* a formal system can be expressed in a <span class=accented>metalogic</span> or a <span class=accented>metalanguage</span>. The metalanguage sits 'above' the formal system it is looking at, called the <span class=accented>object language</span>, in the sense that it is often more 'powerful' or expressive than the object language, and assumes the authority to state and prove theorems about the object language. Proofs about (in)consistency, (in)completeness, (un)decidability, and (un)provability are often stated in a metalogic/metalanguage. Similarly, Tarski's definition of truth in a language (which is in this case the object language) was stated in a metalanguage, and his undefinability theorem showed that the metalanguage and its object language do not necessarily coincide. As in the case of the incompleteness theorems, all of this only holds unless the object language was not very expressive to begin with. If the language is such that self-reference and/or basic arithmetic are not within its expressive capabilities, then it is indeed possible that it could serve as its own metalanguage, and that it is both complete and consistent.

#### Natural Languages
But natural languages *are* expressive by design, that's their whole point. They encompass everything that we would want to talk to each other about.
This includes a multitude of axiomatic systems, spanning formal language, logic, and mathematics. Since linguists, logicians, and mathematicians talk to each other in natural languages like English, natural languages should necessarily operate as metalanguages. If there *were* such a thing as a 'formal natural language', it would seem that Gödel's theorems must apply to it, by virtue of its expressiveness. But in contrast to axiomatic systems of mathematics, we'd probably want a formal natural language to be *complete* rather than *consistent*.

<aside class=aside-right>
Counter-intuitively, formal systems that are 'bigger' are also more likely to be incomplete; recall that first-order logic is complete, but ZF is not! One way to resolve this is to consider that a small box is easy to fill up with things, but bigger boxes take a lot of work to fill up (a box with twice the side length has $8$ times the volume!). The property of being bigger increases the box's propensity for incompleteness.
</aside>

If you went to an English-speaking school, you were probably taught the semantics and grammatical constructs of the English language *in* English. Mathematicians are able to state Gödel's theorems in English. Computer programmers use English to write pseudo-code. A natural language such as English has some element of *completeness* in the sense that we want it to do everything. If it weren't complete, we'd just want a metalanguage 'above' it to fill in the holes, and so on. For example, a non-native English speaker may instinctively switch to their native tongue when they're trying to express something complex, something they may not have the vocabulary for in English. It is even possible that they went to a school where English (the object language) was taught to them in their native tongue (the metalanguage).

<!-- <div>
<figure class=invertible>
<img src=/post-images/test_image.png>
</figure>
</div> -->

This is similar to how we added $CH$ to $ZF$ earlier to 'complete' it in some sense, but we cautioned that it comes at the risk of making the more powerful language, $ZF+CH$, to be inconsistent. In the case of natural languages, we embrace this potential inconsistency as being the trade-off for completeness.

<hr>

Before we close, I should do my due diligence and note that, while formal languages can be used to discuss natural languages, the latter fall under the category of *informal languages* and may not have a definable notion of truth. In fact, Tarski explicitly warned against the extension of his ideas to natural languages. [Tarski\'s critics](https://pca.st/oq41guck) also stress on the distinction between mathematical truth and metaphysical truth, which should not be conflated with each other. Nonetheless, one could argue that the mathematical (or rather, the axiomatic) approach to defining truth is as clean and air-tight a characterization of truth as we can hope to achieve. We just need to bear in mind that we aren't here to establish a singular meaning for the word *truth*, but to appreciate the intricacies involved in defining *truth* and *logic*. The self-reference in trying to arrive at the *true* definition of *truth* shall not be lost on us.