---
title: "Hilbert Spaces"
date: 2023-04-21T12:09:09-04:00
draft: true
---
<!-- 
Consider the optimization problem

<p>
\[
\underset{x\in \mathcal C}{\text{minimize}}\quad f(x)
\]
</p>

where $\mathcal C\subseteq \mathcal X$ is called the *feasible* or the *constraint set*. Here, 

In engineering applications, $f(x)$ corresponds to an error term, or the distance between two objects in a Hilbert space, and so on. It can also be the negative of something we want to $\text{maximize}$.  -->

Let $\mathcal X$ be a Hilbert space, it is an inner product space that is also *complete*, which means it doesn't have er.. holes in it. Recall that inner product spaces have rich geometric structure, and so do Hilbert spaces. The Euclidean space $\bold R^n$ is an obvious example, where the inner product is just the dot product for vectors. Let's look at some more interesting examples.
<!-- Of course, this is equivalent to maximizing $-f(x)$. -->

<b>The $\ell^2$ space:</b> it consists of a sequences of elements in $\mathbb R$ (or some other field, like the complex numbers $\mathbb C$, but we will stick to the real case). We denote this sequence as $(x_i)_{i=1}^{N}$.
This sequence is in $\ell^2$ if and only if it is <span class=accented>square-summable</span>, which means

<p>\[
    \sum_{i=1}^{N}|x_i|^2 < \infty 
    \]</p>

This can be thought of as analogous to how in linear algebra, we study vectors that are a finite Euclidean distance away from the origin. A sequence which is not in $\ell^2$ is 
$\left(\frac{1}{\sqrt{1}}, \frac{1}{\sqrt{2}}, \frac{1}{\sqrt{3}}, \dots\right)$, a sequence that is in $\ell ^2$ is $\left(\frac{1}{1}, \frac{1}{2}, \frac{1}{3}, \dots\right)$.

### Isomorphisms

Recall from [our brief discussion](/posts/cat_theory_1) of category theory that isomorpshisms are maps from one type of mathematical object to another that preserves its structure.
[All (separable) Hilbert spaces are isomorphic to the $\ell^2$ space](http://mathonline.wikidot.com/separable-hilbert-spaces-are-isometrically-isomorphic-to-2), which is a fancy way of saying that we can do the following: We first construct a countable orthonormal basis for $\mathcal X$, denoted as $(e_i)_{i=1}^N$ (if $\mathcal X$ is finite dimensional, we can just use the Gram-Schmidt process to construct one). Then, we define an isometric isomorphism (a distance-preserving, [structure-preserving](/posts/cat_theory_1) mapping) from $\mathcal X$ to $\ell^2$ as follows:

<p>
\[T: \mathcal X \rightarrow l^2\]
\[T(x) = (\langle e_i,x \rangle)_{i=1}^N\]
</p>

The map $T(\cdot)$ [is necessarily linear](https://proofwiki.org/wiki/Surjection_that_Preserves_Inner_Product_is_Linear), which means that the discussion thus far should be reminding us of the concept of `change of basis' in undergraduate linear algebra. 

Suppose we have two finite-dimensional Hilbert spaces, 