---
title: "Hilbert Spaces"
date: 2023-04-21T12:09:09-04:00
tags: ["Linear Algebra"]
draft: false
---

Let $\mathcal X$ be a Hilbert space, which means that it is a vector space that has an <span class=accented>inner product</span> (denoted by $\langle \cdot, \cdot\rangle _\mathcal X$) and that it is <span class=accented>complete</span>, i.e., it doesn't have er... holes in it. [Recall](/posts/norms_metrics) that inner product spaces have a rich geometric structure, and so do Hilbert spaces. The Euclidean space $\mathbb R^n$ is an obvious example, where the inner product is just the dot product. Mathematicians sometimes use 'Hilbert space' to refer specifically to infinite-dimensional inner product spaces, but for our purposes, we will conflate the usage of 'Hilbert space' to include the finite-dimensional case.

Some interesting Hilbert spaces are given below. Each of these spaces has a corresponding norm, $\lVert x \rVert_{\mathcal X}=\sqrt{\langle x, x\rangle}_{\mathcal X}$, which we call as the norm that is *induced* by the inner product.

|  Hilbert Space $\mathcal X$ | Inner Product $\langle \cdot, \cdot\rangle _\mathcal X$ |
| -------------------------------| ---------------------------------------------|
| Numbers $a$, $b\in \mathbb R$ | $ab$ |
| Random Variables $X,Y\in \mathbb R$ | $\mathbb E \left[XY \right]$ |
| Real Vectors $x$, $y\in \mathbb R^n$ | $x^\intercal y$ |
| Complex Vectors $x$, $y\in \mathbb C^n$ | $x^\dagger y$ |
| Matrices $A$, $B\in \mathbb R^{m\times n}$ | $\ \text{Trace}(A^{\intercal}B)$
| Sequences $(x_i)_{i=1}^{\infty}, (y_i)_{i=1}^{\infty}\in \ell ^2(\mathbb R) \ $ | $\sum_{i=1}^{\infty} x_i y_i$ |
| Square-Integrable Functions $f,g \in L^2(\mathbb R)$ | $\int_{-\infty}^{\infty}f(x)\overline{g(x)}dx$

<sub><sub>
Here, $\overline{({}\cdot{})}$ is the conjugate of a complex number (where you replace $i$ with $-i$), $({}\cdot{})^\dagger =\overline{({}\cdot{})}^\intercal $ is called the conjugate transpose of a complex vector.</sub></sub>


### Projections

A defining feature of Hilbert Spaces is their geometry. Because they have [notions of angles](/posts/norms_metrics), we have 

<p>
\[0 \leq {|\langle x, y\rangle_{\mathcal X} |} \leq {\|x\|\|y\|}\]
</p>

where if the first equality holds we say $x$ and $y$ are *orthogonal* to each other, and the second equality holds if and only if they are linearly dependent: $x = a y$ for $a \in \mathbb R$.

We can define the *projection* of an element $x\in \mathcal X$ onto a subspace $S\subseteq \mathcal X$:

<p>
\[ \text{P}_S(x) = \mathrm{argmin}_{y\in S}\|x-y\|_{\mathcal X}\]
</p>

where $\lVert v \rVert_{\mathcal X} = \sqrt{\langle v, v\rangle}_{\mathcal X}$ is the induced norm.
The remarkable by-product of these definitions of angles, orthogonality, and projection, is that it is consistent with our Euclidean intuition: $x-\text{P}_S(x)$ is always orthogonal to $S$. A [related theorem](https://en.wikipedia.org/wiki/Hilbert_projection_theorem) says that $\text P_{\tilde S}(x)$ is well-defined and unique even if $\tilde S \subseteq \mathcal X$ is a closed convex set, although in this case we do not have orthogonality of $x-\text{P}_{\tilde S}(x)$ to the other elements in $\tilde S$.

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/projection.png>
</figure>
</div>

As an example, in the Hilbert space of random variables, for its elements $X$ and $Y$, orthogonality corresponds to $\mathbb E\left[X Y\right] =  0$, the norm becomes the variance, and (orthogonal) [projection gives the least-squares estimator of given a random variable](https://inst.eecs.berkeley.edu/~ee126/sp18/projection.pdf). More generally, projection can be used to [best approximate](https://math.stackexchange.com/questions/3000704/orthogonal-projection-on-a-polynomial-space) an element of a Hilbert space using a finite set of basis vectors of that (or another) Hilbert space.

<hr> 

### The $(\mathbb R^N, \lVert{}\cdot{}\rVert_2)$ Space of Sequences

This looks just like the Euclidean space of $N$-dimensional vectors. I mean, a vector is a set of $N$ coefficients (real numbers) where each coefficient describes the vector's distance along the corresponding standard basis vector (or 'axis', if you will).
<!-- Instead of axis, we should say orthonormal basis. -->

Now, let's ignore all of that and our geometric intuition of vectors, and consider that $\mathbb R^N = \mathbb R \times \mathbb  R \times \dots \times \mathbb R$ is just a set-theoretic definition. An element $x$ of this space is a sequence of real numbers,

<p>
\[x = (x_1, x_2, \dots, x_N)\]
</p>

and the norm can be defined as $\left(\sum_{i=1}^N |x_i|^2\right)^{1/2}$. So, nowhere did we have to talk about vectors or matrices. We can generalize this to $N\rightarrow \infty$.

### The $\ell^2$ Space of Sequences
$\ell^2(\mathbb R)$ consists of countable sequences of real numbers. 'Countable' here means that we can count them like we can count the natural numbers, but they are infinitely long nonetheless. We denote this sequence as $(x_i)_{i=1}^{\infty}$.
A sequence is in $\ell^2$ if and only if it is <span class=accented>square-summable</span>, which means

<p>\[
    \sum_{i=1}^{\infty}|x_i|^2 < \infty 
\]</p>

A sequence which is not in $\ell^2$ (i.e., an 'infinite-length vector') is 
$\left(\frac{1}{\sqrt{1}}, \frac{1}{\sqrt{2}}, \frac{1}{\sqrt{3}}, \dots\right)$ because its sum-of-squares decays too slowly as the number of terms increases. A sequence that is in $\ell ^2$ is $\left(\frac{1}{1}, \frac{1}{2}, \frac{1}{3}, \dots\right)$.

<!-- [^aside]: $\ell^p$ spaces (with the $p$-norm defined analogously) can shed some insight into how vector spaces behave in the limit $N\rightarrow \infty$! Perhaps you could [revisit my post](/posts/balls) on norm balls, think of higher dimensional Euclidean spaces as tending towards the $\ell^2$ space. -->

### (Separable) Hilbert Spaces are Isomorphic

<span class=accented>Isomorpshisms</span> are maps from one type of mathematical object to another that preserve its structure. 
[All (separable) infinite-dimensional Hilbert spaces are isomorphic to the $\ell^2$ space](http://mathonline.wikidot.com/separable-hilbert-spaces-are-isometrically-isomorphic-to-2), which is a fancy way of saying that we can do the following: We first construct a countable orthonormal basis for $\mathcal X$ (e.g., using the [Gram-Schmidt process](https://en.wikipedia.org/wiki/Gram–Schmidt_process)), denoted as $(e_i)_{i=1}^{\infty}$. Then, we define an isometric isomorphism (a distance-preserving, [structure-preserving](/posts/cat_theory_1) mapping) from $\mathcal X$ to $\ell^2$, as follows:

<p>
\[T: \mathcal X \rightarrow \ell^2\]
\[T(x) = (\langle e_i,x \rangle_{\mathcal X})_{i=1}^{\infty} \]
</p>

which is the set of coefficients of $x$ along each basis vector. Note that $T$ is basis-dependent, we could pick a different basis and get a different $T$.
Since $T$ is an isomorphism (i.e., does not 'destroy' information during the mapping), we may hope to be able to go back from $\ell^2$ to $\mathcal X$:

<p>
\[T^*: \ell^2 \rightarrow \mathcal X\]
\[T^{*}\left((c_i)_{i=1}^{\infty}\right) = \sum_{i=1}^{\infty} c_i e_i \]
</p>

Here, $T^{*}$ is called the *adjoint* of $T$; it is an operator that satisfies 

<p>\[\langle y,T(x)\rangle _{\ell^2} = \langle T^*(y),x\rangle _{\mathcal X}\]</p>

It can be shown that the map $T({}\cdot{})$ [is necessarily linear](https://proofwiki.org/wiki/Surjection_that_Preserves_Inner_Product_is_Linear), and that [$T^*$ is also the inverse of $T$](https://proofwiki.org/wiki/Linear_Transformation_is_Isomorphism_iff_Inverse_Equals_Adjoint).
The discussion thus far should be reminding us of linear transformations in undergraduate linear algebra. Indeed, the mapping $T({}\cdot{})$ can always be represented via a matrix, although this matrix can be infinite dimensional in general.


Using a similar reasoning as above in the finite-dimensional case, we see that all (separable) Hilbert spaces with dimension $N$ are isomorphic to the $(\mathbb R^N, \lVert{}\cdot{}\rVert_2)$ space.
The condition that $T^*=T^{-1}$ might remind you of [unitary matrices](https://en.wikipedia.org/wiki/Unitary_matrix) ($U^\dagger = U^{-1}$, where $U^\dagger$ is the conjugate transpose of $U$), which are exactly the distance-preserving, structure-preserving matrices in $\mathbb C^N$. 

When we're working in $\mathbb R^N$, we replace 'unitary' with 'orthonormal', and we have $Q^\intercal = Q^{-1}$ for an orthonormal matrix $Q$. They are an isometry (distance-preserving) because $\lVert Qx\rVert_2 = \lVert x \rVert_2$, and they are an isomorphism (structure-preserving) because $\langle Qx, Qy \rangle =\langle x, Q^\intercal Qy \rangle = \langle x, y\rangle$. (Note that isomorphisms preserve 'right angles.')

Thus, we always have a (non-unique) unitary matrix (or a [unitary operator](https://en.wikipedia.org/wiki/Unitary_operator), in the infinite-dimensional case) which will take us from one vector space to 'another' (but actually, it takes us to a rotated version of the same space 🙃) in a distance-preserving, structure-preserving manner.

<hr> 

### The $L^p$ Space of Functions

Let's move onwards to function spaces.
The space $L^1(\mathbb R)$ is the space of <span class=accented>absolutely integrable</span> functions:

<p>
\[ \| f\|_{L^1} =\int_{\mathbb R} | f(x)| dx < \infty
\]</p>

where $f:\mathbb R\rightarrow \mathbb C$ (so yeah, its codomain can be complex-valued). It is not a Hilbert space, because we have not yet defined an inner product for this space. The space $L^2(\mathbb R)$ has functions which are <span class=accented>square-integrable</span>:

<p>
\[ \| f\|_{L^2} =\left(\int_{\mathbb R} | f(x)|^2dx\right)^{1/2} < \infty
\]</p>

which is a Hilbert space because it has the following inner product + norm combination:

<p>
\[ \langle f, g \rangle_{L^2} = \int_{\mathbb R} f(x) \overline{g(x)} dx\]
\[ \| f\|_{L^2} = \sqrt{ \langle f, f \rangle_{L^2}}\]
</p>

where $\overline {z}$ is the complex conjugate of $z\in \mathbb C$. Can we use the above as an inner product for $L^1$ as well? It turns out that we can't, because even if $f$ is in $L^1$, the integral of '$f(x)f(x)$' can be unbounded if $f$ is not also in $L^2$. 
<!-- Other $L^p$ spaces are defined analogously. -->
<!-- This would violate the Cauchy-Schwarz inequality for any valid inner product, $| \langle x, y\rangle| \leq \lVert x \rVert \lVert y \rVert$. -->

<aside class=aside-center>
Observe that we always require some sort of 'boundedness of norm' when defining Hilbert spaces... it is related to the requirement of <i>completeness</i> of the space, which we so conveniently glossed over. 
</aside>


The norms on $\ell^p$ and $L^p$ spaces are natural extensions of the [$p$-norms](/posts/norms_metrics) for finite-dimensional vector spaces, and as expected, we have an inner product only when $p=2$. The $L^p(\mathbb R)$ space can be thought of as a 'refinement' of the domain of the $\ell^p$ space[^net], where the index set $\lbrace 1, 2, \dots, \infty\rbrace$ (which was countable) of $\ell^p$ is replaced with $\mathbb R$ (which is uncountable) in $L^p$. So even though these might seem like completely different concepts thrown together, they are [closely related](https://en.wikipedia.org/wiki/Lp_space#Special_cases) and inherit much of each other's properties!

[^net]: We could also view it as a *[net](https://en.wikipedia.org/wiki/Net_%28mathematics%29)*.

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/hilbert_spaces.png>
</figure>
</div>

But since $L^2$ and $\ell^2$ are supposed to be isomorphic, this suggests that we can go from $L^2$ to $\ell^2$ (and back) using a linear map. The fact that we can represent an arbitrary function on a continuous domain using a sequence of numbers is remarkable.

#### [Fourier Transforms](https://en.m.wikipedia.org/wiki/Hilbert_space#Fourier_analysis)

This section is for people who might have encountered the Fourier transform before, and want to see the Hilbert space interpretation of it.

Suppose $f\in L^2([0,1])$ is a *signal*, which means that $f(t)$ is the amplitude of the signal at time $t$. The sinusoid is everybody's favorite example of a signal, given by $f(t)=\sin
(t)$.
An orthogonal basis for $L^2([0, 1])$ is $(e_k)_{k\in \mathbb Z}$, where 

<p>\[e_k(t)=\frac{1}{\sqrt{2 \pi}}e^{2 \pi i k{t}}\]</p>

Here, $\mathbb Z$ are the integers, which is still a countable set because we can count them as $(0, 1, -1, 2, -2, \dots)$.
In this case, our isomorphism $T$ from $L^2([0,1])$ to $\ell^2$ is given by:

<p>
\[T(f) = \left(\langle f, e_k \rangle \right)_{k\in \mathbb Z}\]
</p>
<p>
\[T(f) = \left( \frac{1}{\sqrt{2\pi}}\int_{0}^1 f(t)e^{-2\pi i kt} dt\right)_{k\in \mathbb Z}\]
</p>

These are exactly the Fourier coefficients (up to a constant factor, depending on how you define them)! Each coefficient tells you how much of a certain frequency is present in a signal. The way we have defined them (with proper normalization of the basis vectors) ensures that the Fourier transform $T$ is an isometric isomorphism. In fact, the observation that 

<p>\[\langle f, g\rangle_{L^2([0,1])} = \langle T(f), T(g)\rangle_{\ell^2}\]
</p>

has a special name in the signal processing community: it's called <a href="https://en.wikipedia.org/wiki/Parseval's_theorem" class=accented>Parseval's theorem</a>. We can also truncate the small Fourier coefficients to *[compress](https://www.dspguide.com/ch27/6.htm)* (or *de-noise*) a signal by ignoring its weak (or bothersome) frequencies -- be it an audio signal or an image. This truncation is a special case of the projection in Hilbert spaces, so it's in fact the best approximation in terms of the $L^2$ norm of the approximation error. 

<hr> 

One of the motivations for defining the map $T$ is that we can now represent objects in an arbitrary Hilbert space using a (countable) set of numbers (in $\ell^2$). Aside from being a powerful theoretical tool, it lets us store and manipulate these objects on computers efficiently, as evidenced by the example of the Fourier transform. 

All that said, the reason I love typing out posts like these is because it's so gratifying to see all of these different mathematical objects be unified under a single concept. The interplay between vectors, sequences, and functions is something that was never taught or emphasized to me in school. All throughout college, my instructors usually pulled the Fourier transform out of their hat, just to use it for 2 lectures and then put it back in before I ever figured out what it was. Maybe I'm just a slow learner, so it's a good thing I have (hopefully) a long life ahead of me to keep learning.

<!-- Aha! I'm now beginning to understand some of the things that were kept hidden from me... -->

<!-- https://math.stackexchange.com/questions/2739175/do-we-really-need-to-specify-a-basis-to-describe-a-tuple -->