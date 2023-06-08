---
title: "What is a Vector?"
date: 2023-05-20T15:26:18-07:00
draft: false
tags: ["Linear Algebra"]
---

A running gag in engineering colleges is that a lot of instructors begin their first class of the semester with this question: "<span class=accented>What is a vector?</span>".
I used to find this ritual almost pointless because to me, every answer to this question felt either like a non-answer or a matter of context. I mean it depends, right? A structural engineer should have a different answer to this question than, say, a data scientist. To a structural engineer, a vector is a physical measurement that has a magnitude and a direction, whereas a data scientist may not necessarily think of a vector as having a direction. Indeed, in its full generality, a vector does not need to have geometric notions such as *directions* and *angles* associated with it. Today, I no longer think that this is a matter of context. By virtue of how we phrase the question  "<span class=accented>What is a vector?</span>", we may be asking (without ambiguity) the question: "If I call some mathematical object a vector, what does that tell you about it?" 

To skip ahead to the punchline of this post, <span class=accented>a vector is an element of a vector space</span>. If that too feels like a non-answer to you, then I would argue that we were asking the wrong question in the first place. We should be asking instead -- "<span class=accented>What is a vector space?</span>"

<h3 id="Field">Field</h3>

Before defining a vector space, we need to define a <span class=accented>field</span>. To jump ahead a bit, $\mathbb R$ and $\mathbb C$ (the real and complex numbers, respectively) are examples of fields. Data scientists typically use $\mathbb R$ as the underlying field for the vector spaces they are dealing with, but [control theorists](https://en.wikipedia.org/wiki/Control_theory) may work in a complex vector space, where the field under consideration may be $\mathbb C$.

A field, $K$, is a set of objects, together with two binary operations -- <span class=accented>addition</span> and <span class=accented>multiplication</span> (which we denote by '$+$' and '$\times$'), that satisfy the so-called [field axioms](https://mathworld.wolfram.com/FieldAxioms.html). The field axioms are a set of rules that establish the associativity, commutativity, and distributivity of addition and multipication. For example, the addition operation is said to be associative if, for elements $a,b,$ and $c$ in $K$, $(a+b)+c=a+(b+c)$.  

In addition, the field axioms stipulate that there be (distinct) identity elements for '$+$' and '$\times$'. In the field $\mathbb R$, we have for $a\in \mathbb R$, $a+0=a$ and $a\times 1=a$, which make $0$ and $1$ the identity elements of addition and multiplication, respectively.

<h3 id="Vector-Space">Vector Space</h3>

A vector space, $(V, K, $ +$, *)$, has the following ingredients:

1. a field, $K$, which comes with the addition and multiplication operations, '$+$' and '$\times$'. Elements of $K$ are called <span class=accented>scalars</span>
2. a set of objects, $V$, whose elements are called <span class=accented>vectors</span>
3. two more binary operations, which we denote by '+' and '$*$', where
    - '+' is called the <span class=accented>vector addition</span> operator; it operates on two vectors to give another vector
    - '$*$' is called the <span class=accented>scalar multiplication</span> operator; it combines a scalar and a vector to give another vector

While $K$ satisfies the field axioms (by definition), the vector space $(V, K,$ +$, \*)$ satisfies [additional axioms](https://mathworld.wolfram.com/VectorSpace.html). In addition to commutativity and associativity of '+', it has some interesting axioms which may look trivial unless we distinguish the operations '$+$' and '$\times$' (which belong to the field, $K$) from '+' and '$*$'. For instance, one of these axioms is that, for $a, b \in K$ and $v \in V$,

<p>
\[(a + b)* v = a*v \char"FE62 b*v\]
</p>

which is not obvious or trivial, because we haven't stipulated anything else so far that requires '$+$' and '+' to behave anything like each other. 

An obvious example of a vector space is $(\mathbb R^n, \mathbb R, $ +$, *)$, where $n$ is a positive integer. A less obvious example is [the vector space of functions](https://en.wikipedia.org/wiki/Function_space) having a common domain (say, $\mathbb R$), whose codomain is a vector space. In this case, the operations '+' and '$\*$' are pointwise addition and multiplication of functions. For instance, for a scalar $\alpha$ and a vector $f$, the scalar-vector multiplication $\alpha * f$ yields the vector $g$, where $g(x)=\alpha \times f(x)$.
We looked at this vector space in [an earlier post](/posts/hilbert-spaces).

Note that $R^n$ is a vector space even if $n=1$. I've put together some examples of vector spaces in a table [here](/posts/hilbert-spaces).

### Adding more ingredients...

We can add more ingredients to a vector space to give it more *structure*. I explore this in [other posts](/posts/norms_metrics), but in summary,

- A <span class=accented>normed vector space</span> is a vector space, $(V, K,$ +$, \*)$, along with an operation, $\Vert \cdot\Vert : V \rightarrow \mathbb R$, which is called the <span class=accented>norm</span>. The norm should satisfy certain axioms. The norm is useful for defining the notion of a *length* or *magnitude* of a vector $v\in V$ as being equal to $\Vert v \Vert$ units.

- An <span class=accented>inner product space</span> is a vector space, $(V, K,$ +$, \*)$, along with an <span class=accented>inner product</span> operation, $\langle \cdot,\cdot \rangle : V\times V \rightarrow K$, which is a binary operation that takes two vectors to its field. The inner product comes with its own set of axioms. In $\mathbb R^n$, we can define $\langle x, y\rangle = x^\top y$ as an inner product. Inner products are necessary to define geometric concepts such as *directions* and *angles*.

Thus, a vector may neither have a magnitude nor an direction! Someone who claims otherwise is perhaps referring to the inner product space $\mathbb R ^n$ (where the inner product is the so-called 'dot product'), which is a very specific example of a vector space.

#### When does any of this matter?

What we have done is developed an axiomatic characterization of a vector space. All of your favorite properties of vectors are now *theorems* that follow from these axioms. A key motivation for doing so is that it allows us to define a lot of useful vector spaces where the *vectors* can be anything from *functions* to *random variables*. Elements of these vector spaces behave like vectors ought to, so we can do linear algebra with them, for e.g., we can construct bases and linear transformations for them. Importantly, we can extend them to more "structured" spaces by adding additional ingredients such as norms and inner products.

Even if we are working within $\mathbb R^n$, it can help to be aware of these subtleties. Consider the following <span class=accented>paradox</span> for vectors $u,v$ and $w$ in $\mathbb R^n$, where we omit all the binary operations:

- We have the well-defined column vector, $(u^\top v)w = w(u^\top v)$
- Once we drop the parenthesis, the quantity '$u^\top v w$' makes no sense, because it is not clear what '$v w$' is supposed to be, whereas '$w u^\top v$' appears to be a well-defined column vector

If one were doing a proof, it may appear reasonable to substitute $(u^\top v)w$ with $w(u^\top v)$ and call it 'commutativity'. It may appear reasonable also, to drop the parenthesis and call that 'associativity'. However, we seem to have made an error somewhere. What's going on?

Re-introducing all of the binary operations, we see that what we called 'commutativity' is in fact the following statement (whose validity we are yet to determine):

<p>
\[ 
    \langle u, v\rangle * w  = w * \langle u, v\rangle
    \]
</p>

Strictly speaking, '$*$' is a function which is not symmetric in its arguments; it is a function such as $f(\text{scalar}, \text{vector})=\text{vector}$. We cannot swap the arguments of $f$ around without redefining $f$, as part of which we should redefine the domain of $f$. Nevertheless, we may assume that $\langle u, v\rangle * w  = w * \langle u, v\rangle$ is a meaningful statement for our notational convenience. On the other hand, what we called 'associativity' earlier does not have any meaning, because two completely different binary operations are involved. 

As a rule of hand, if you retain the binary operations, there is no way that it would lead to a 'paradox', but once you drop the binary operations in favor of concise (but potentially ambiguous) notation, you're on your own.

### The Bigger Picture

At the end of the day, I do not recommend introducing all of the binary operations into your linear algebra proofs. I *certainly* do not recommend distinguishing between '$+$' and '+' (unless they happen to behave quite differently from each other). What I would propose is that one be aware of the intricacies of how we define a vector space. It is only natural to expect that similar intricacies are present in how we define *any* mathematical concept, that are neglected or brushed over in undergraduate engineering education.

In [category theory](/posts/cat_theory_1), which is an area of mathematics that seeks to unify several disparate areas of mathematics, a most prized result is the [Yoneda lemma](https://en.wikipedia.org/wiki/Yoneda_lemma), which in its essence says the following: A mathematical object can be defined (pretty much) uniquely without referring to any of its intrinsic characteristics, but purely by means of its <span class=accented>relationships</span> to other objects. For instance, the number $2$ refers to the concept where you have *more than* $1$, but also *less than* $3$ thing(s). $2$ is also less than $6$, and so on. Thus, we may define $2$ by virtue of its *relationships* to other objects in its category.

This is kind of like how we define not what a vector is, but rather, we define a vector space as the collection of objects that are related to each other in a certain way. The definition of a vector follows naturally -- it is an object that participates in this system of relationships. 
<!-- One can think about defining a *Muslim* as a person who aligns with a minimal set of Islamic values/traditions/tenets. Defining who a Muslim is, satisfactorily and without reference to  -->