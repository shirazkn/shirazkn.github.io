---
title: "Cat Theory 😼"
date: 2023-03-18T21:07:38-04:00
tags: ["General"]
draft: false
---

One of my motivations for starting a blog was Eugenia Cheng's book [The Joy of Abstraction](https://www.amazon.com/Joy-Abstraction-Exploration-Category-Theory/dp/1108477224)[^bookclub]. It's a surprisingly accessible, gentle introduction to <span class=accented>category theory</span>, a topic that is usually only taught to graduate students in math. She compiled part of the book using notes from the category theory class that she teaches at the Art Institute of Chicago, a testament to the aesthetic appreciation that one can expect to gain of category theory, irrespective of their academic background. In this post I will introduce the main ideas in category theory (as I best understand it) and show that it offers a 'clean' way of thinking about mathematics.

<!-- **Required Background:** Familiarity with 'one-one' and 'onto' functions between sets.  -->

<!-- If you come across something that's new to you, Wikipedia is your friend! -->
<!-- A secondary motivation for my starting this blog was when I described a bit of mathematics as *elegant* to my friend. She said she'd never heard mathematics be described as elegant before. -->

[^bookclub]: At the time of me writing this post, there is [an ongoing book club](https://topos.site/joa-bookclub/) for The Joy of Abstraction being hosted by its author.

### The Main Idea

The mathematician Tai-Danae Bradley [describes category theory](https://www.youtube.com/watch?v=Gz8W1r90olc) as a sort of *mad libs* for mathematics. Mad libs are a game where you have a sentence with a few blank spaces, and depending on what you place in the blank space, you get a different interpretation out of it: 

<p class="equation-like print">
Your <span class=gray>[noun]</span> is so <span class=gray>[adjective]</span> that it's making me <span class=gray>[adjective]</span>!
</p>

Mad libs fix the *structure* of the sentence, but the *objects* you put in let you extract different interpretations out of it. Try putting in the words <span class=gray>blog</span>, <span class=gray>boring</span> and <span class=gray>sleepy</span> 😕 

Category theory lets you do something similar. Every now and then you encounter something in mathematics that makes you go "Hey, this feels a lot like that other thing!" If there were some way to move back and forth between the two universes that have a similar structure, we can apply the insights that we gain in one universe to the other. The following is an example of where I might want to 'move between mathematical universes with the same structure':

<p>
<aside class=aside-center>
The so called <b>contrapositive</b> of the statement $\textbf A\Rightarrow \textbf B$ ($\textbf A$ implies $\textbf B$), is $\neg \textbf B \Rightarrow \neg \textbf A$ ('not $\textbf B$' implies 'not $\textbf A$'). A statement and its contrapositive are logically equivalent, i.e.,
\[\textbf A\Rightarrow \textbf B \quad \textit{if and only if} \quad \neg \textbf B \Rightarrow \neg \textbf A\]
</aside>
</p>

Now consider the following relationship between sets $A$ and $B$ instead:

<p>
<aside class=aside-center>
Let $A^C$ denote the complement of $A$, i.e., everything that's not in $A$. Then we have
\[ A\subseteq B \quad \textit{if and only if} \quad B^C \subseteq A^C \]
</aside>
</p>

<div>
<figure class=invertible>
<img src=/post-images/cat_theory/set_contrapositive.png>
</figure>
</div>

Even if these examples are of no interest to you, all we need to note is that we replaced the symbol $\Rightarrow$ (implies) with $\subseteq$ (is a subset of), but the relationship between the corresponding objects look almost identical. As the objects we're swapping out become more complex, the insights that carry over during the 'swapping out' become deeper. 

The two different mathematical universes (*logic* and *set theory*) consist of objects (*statements* and *sets*) as well as relationships between them ($\Rightarrow$ and $\subseteq$). Similarly, a category is something that is made up of objects as well as their relationships to each other (called *morphisms*), satisfying some additional rules which impart to it its structure.

### Categories

The best part of category theory is that it takes a whopping $10$ minutes or so to set up the foundations of it, but it comes with rich insights and new ways of thinking about math. Let's give the definition of a category.

A **category** $\mathcal C$ consists of **objects** $\text{ob}(\mathcal C)$ and **morphisms**, which are basically *arrows* from one object in the category to another.
For objects $X$ and $Y$ in $\text{ob}(\mathcal C)$, we write $\mathcal C(X,Y)$ to denote the collection of all the morphisms (or arrows/relationships) from $X$ to $Y$. Note that (unlike in the above two examples) there may be more than one arrow in $\mathcal C(X,Y)$.

If there is an arrow $f$ from $X$ to $Y$, and an arrow $g$ from $Y$ to $Z$, then we can draw an arrow from $X$ to $Z$ (which represents the path of going from $X$ to $Y$, then to $Z$). We call this specific arrow from $X$ to $Z$ as the **composition** of $f$ and $g$, denoting it as $g\circ f$. We also say that $f$ and $g$ are *composable*, since the arrow-head of $f$ touches the tail of $g$.

<p>
<aside class=aside-center>
To see why the composition is written 'backwards', i.e., as $g \circ f$ rather than '$f \circ g$', think of the objects as sets and the morphisms as functions between sets. That is, if $f:A\rightarrow B$ and $g:B\rightarrow C$, then $g(f(\cdot)):A\rightarrow C$ is a function from $A$ to $C$. Composition of functions is a special case of the composition in category theory.
</aside>
</p>

<div>
<figure class=invertible>
<img src=/post-images/cat_theory/composition.png>
</figure>
</div>

In addition to objects, morphisms, and their compositions, any category has an underlying *structure* that is imparted to it by the following properties:

- **Identities**: For every object $X$, there exists a morphism $1_X$ from $X$ to itself, called the *identity morphism*. 
Moreover, for any $X$ and $Y$ in $\text{ob} (\mathcal C)$ and $f$ in $\mathcal C(X,Y)$, we must have $f \circ 1_X = f = 1_Y \circ f $. In other words, $1_X$ is like <span class=accented>$\text{stay at X}$</span>, and $1_Y$ is like <span class=accented>$\text{stay at Y}$</span>. 
<div>
<figure class=invertible>
<img src=/post-images/cat_theory/identities.png>
</figure>
</div>

- **Associativity**: For $f$, $g$ and $h$ in $\mathcal C(W,X)$, $\mathcal C(X,Y)$, and $\mathcal C(Y,Z)$, respectively, we must have $h \circ (g \circ f)$ = ($h \circ g) \circ f$.  Visually, the <span class=accented>pink</span> arrow in this figure can be obtained in two equivalent ways:
<div>
<figure class=invertible>
<img src=/post-images/cat_theory/associativity.png>
</figure>
</div>

If $X\in \mathbb R^n$ and $Y \in \mathbb R^m$ are vector spaces and $M$ is the $n \times m$ matrix that takes $X$ to $Y$, then the first bullet point is saying $ M I_m = M = I_n M$. Similarly the second bullet point is just stipulating the associativity of matrix multiplication. The order in which we compose arrows (that are composable) does not matter.

In the two examples we gave earlier (*logic* and *sets*), we only introduced one morphism ($\Rightarrow$ and $\subseteq$, respectively) that goes between any two objects. Since $\textbf A \Rightarrow \textbf A$ and $A\subseteq A$, we *do* have identity morphisms (arrows from the object to itself) at each object. Similarly, if the objects are numbers, then $\leq$ is another morphism that serves both as an identity as well as a relationship between two distinct numbers. At the same time, $<$ would not work as an identity morphism, as it is not true that a number is $<$ itself. 

Observe that we are in the business of 'swapping out' morphisms and not just objects.

### The Category of Sets

We could define a category $\mathcal C$ consisting of sets (as its objects) in many different ways, depending on what sort of relationships (morphisms) we want to represent between them. However, the category of sets refers to one particular type of category. It is the category $\mathcal C$ where $\text{ob}(\mathcal C)$ are sets and $\mathcal C(X, Y)$ is the collection of all the *functions* from sets $X$ to $Y$. A function $f$ in $\mathcal C(X, Y)$ assigns to each element in $X$ an element in $Y$.

Now I'll demonstrate why this representation of sets is *cleaner* than the way we usually think about sets. Recall that a function $f:X\rightarrow Y$ is **injective** or 'one-one' if for all $x_1,x_2 \in X, f(x_1)=f(x_2) \Rightarrow x_1 = x_2$. In other words, two different elements cannot map to the same element. The function $f$ is called **surjective** or 'onto' if for every $y\in Y$, there exists some $x\in X$ such that $f(x)=y$. In other words, the image of $X$ under the operation $f$ gives all of $Y$, and not just some part of $Y$. <span class=gray>(Of course, the arrows in the following illustration are NOT supposed to be morphisms! Let's call these 'diagrams of sets' as opposed to diagrams of categories.)</span>
<div>
<figure class=invertible>
<img src=/post-images/cat_theory/one-one.png>
</figure>
</div>

Now I don't know about you, but these definitions look pretty asymmetrical to me. If I'd never seen them before, I would wager that they are talking about two completely different concepts, and you could argue that they are. The two concepts are united by the fact that if $f$ is both injective and surjective, then it is **invertible**, i.e., there exists some function $g: Y\rightarrow X$ such that $g \circ f = 1_X$ and $f\circ g = 1_Y$. In this case, $f$ is said to be **bijective**, and $g$ is called the *inverse* of $f$.

<div>
<figure class=invertible>
<img src=/post-images/cat_theory/invertibility.png>
</figure>
</div>

As an example, let $X$ be a set of people and $Y$ be some tasks or missions. $f$ is the assignment of people in $X$ to tasks in $Y$. The inverse function $g$ can then be thought of like 'holding people accountable for their tasks'. If a task or a mission goes badly, we want the inverse function $g$ to tell us exactly who to hold responsible for its failure. If $f$ is not injective, either of two people who worked on the same task may be to blame. If $f$ is not surjective, it means that we don't have anyone to blame for one of the tasks, because apparently no one was even assigned that task.

We just saw that *invertible functions* between sets has a purely categorical definition, namely the existence of a 'reverse' morphism from $Y$ to $X$ satisfying some properties. We could extend this definition to define *invertible morphisms* in any category. At the same time, we could ask if there is a purely categorical definition of **injective** and **surjective** functions. Of course there is, or this would've be an odd note to end this post on.

### Monics and Epics

In any category $\mathcal C$ with objects $X$ and $Y$, a morphism $f$ in $\mathcal C(X, Y)$ is said to be a **monomorphism** or a **monic** between $X$ and $Y$ if for all objects $Z$ and morphisms $g_1$ and $g_2$ in $\mathcal C(Z, X)$,

<p>\[ f \circ g_1 = f\circ g_2 \quad \Rightarrow \quad g_1 = g_2 \]</p>

In any category $\mathcal C$ with objects $X$ and $Y$, a morphism $f$ in $\mathcal C(X, Y)$ is said to be an **epimorphism** or an **epic** 😎 between $X$ and $Y$ if for all objects $Z$ and morphisms $g_1$ and $g_2$ in $\mathcal C(Y, Z)$,

<p>\[ g_1 \circ f = g_2 \circ f \quad\Rightarrow \quad g_1 = g_2 \]</p>

In the category of sets, the monomorphisms and epimorphisms are precisely the injective and surjective functions, respectively. Now *these* definitions look so symmetric that they almost seem wrong. So why is it that they are equivalent definitions for injectivity and surjectivity, respectively? To begin with, why is a monomorphism, as defined above, necessarily an injective function (and vice versa)?[^direction]

[^direction]: We just showed one direction of each of these equivalences, at best. The main goal is to get an intuition for why the two definitions of injectivity and surjectivity may be equivalent!

#### 1. Monics are Injective Functions
The trick is to think of a monomorphism $f:X\rightarrow Y$ as a re-labeling of the elements of $X$. Suppose $X$ is a set of *people* and $Y$ is a set of (distinct) *names*, then let $f$ be the operation of assigning each person a name. $f$ is injective if each person gets a distinct name (no two people have the same name). In that case, if I give you a list of names, you know exactly which list of people I picked. In the figure, the <span class=accented>purple</span> arrows are the monomorphism (assignment of distinct names):

<div>
<figure class=invertible>
<img src=/post-images/cat_theory/monic.png>
</figure>
</div>

$f$ would not be a monomorphism if two people were given the same name, say, <span class=print>John</span>, i.e., two of the <span class=accented>purple</span> lines go into the same name. In that case, I could have picked either <span class=print>John</span> (corresponding to two different lists of people, $g_1$ and $g_2$) but produced the same list of names ($f \circ g_1 = f \circ g_2$), and you would have no way of telling which list of people you were looking at since you do not know which <span class=print>John</span> I picked. You would instead point a finger at me and accuse me of being 'ambiguous'.

Succintly, $f$ *remembers* which elements went to which elements. It does not *forget* that there are $n$ distinct people by assigning two or more of them the same name.

#### 2. Epics are Surjective Functions

Finally, let's see why the definition of epimorphisms of sets works as the definition for surjectivity. This is perhaps more difficult to see, because it looks so different from the set-theoretic definition of surjectivity. Let's take this post to a full circle and invoke the *contrapositive* of the definition for an epic, which says that an **epimorphism** or an **epic** is, equivalently, a morphism $f$ in $\mathcal C(X, Y)$ such that for all objects $Z$ and morphisms $g_1$ and $g_2$ in $\mathcal C(Y, Z)$,

<p>\[ g_1 \neq g_2 \quad\Rightarrow \quad g_1 \circ f \neq g_2 \circ f  \]</p>

This means that **pre-composing** $g_1$ and $g_2$ with $f$ *retains the ability* to distinguish $g_1$ and $g_2$. Suppose $f$ weren't surjective, then we may no longer be able to distinguish $g_1$ and $g_2$ because $f$ is not even 'looking at' one of the elements, which may be crucial to distinguishing $g_1$ and $g_2$:
<div>
<figure class=invertible>
<img src=/post-images/cat_theory/epic.png>
</figure>
</div>

Similarly, the definition of monics (which are the injective functions) was really saying that **post-composing** with $f$ *retains the ability* to distinguish two morphisms $g_1$ and $g_2$, because in that case $f$ was just a re-naming of the objects. 

<!-- Now it's also more explicit what injectivity and surjectivity have to do with invertibility. When we travel along a function and its inverse, we get back to where we started. -->

### Thinking Categorically

Of course, two days after I published this post, two of my favorite math communicators made a podcast episode about category theory. [Eugenia Cheng talks to Steven Strogatz](https://www.quantamagazine.org/is-there-math-beyond-the-equal-sign-20230322/) about why she finds joy in thinking categorically, i.e., approaching these types of math concepts from a category theory standpoint. 

What we showed above was that some concepts in math might be a bit messy or aesthetically lacking due to how they're set up. This messiness also prevents us from generalizing ideas like injectivity and surjectivity to other fields in math, because they're too deeply rooted in the language of set theory. Category theory allows us to zoom out and 'blur out' the messiness, focusing our attention only on the thing that really matters: structure! As a bonus, we get to apply our insights to all of the other mathematical fields that have analogous properties, and therefore similar (or identical) structures.
You could argue that this is a joyful way of learning mathematics. One where all of mathematics is yielding itself to you, simultaneously.


<!-- It's like you're building a sculpture out of screws, nuts, and metal. If you're studying niche topics in mathematics, you might want to zoom into the screws and nuts of the sculpture, make sure that everything is holding together. But in addition, category theory encourages you to step back and look at the sculpture itself. You can now appreciate the bigger picture of what those screws and nuts were building towards. You can also turn your focus towards structural issues related to your sculpture.
You can compare your sculpture with other sculptures that might be made of entirely different ingredients (glue?).  -->

<!-- [^hom]: The name $\text{hom}$ comes from the word 'homomorphisms', which is really a special case of a morphism that predates category theory. -->
