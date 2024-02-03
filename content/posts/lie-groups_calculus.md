---
title: "Lie Groups: A Tensor Calculus Perspective"
date: 2024-01-30T09:53:05-05:00
draft: true
---

In this post, I make liberal use of tensor calculus to set up the devices of differentiation and integration on Lie groups. If you are seeking a more application-oriented approach and/or aren't all that interested in the math herein, [this book](https://link.springer.com/book/10.1007/978-0-8176-4944-9) has all the formulae worked out. Note that I will be using the [Einstein summation](https://en.wikipedia.org/wiki/Einstein_notation) convention throughout.

### Differential Forms

A <span class=accented>volume form</span> $\omega$ on an $n$-dimensional manifold $M$ is a differential $n$-form, which can be thought of as a multilinear function that takes $n$ tangent vector fields as its arguments and spits out a $C^\infty(M)$ function.[^nforms] That, and it's also antisymmetric in its arguments (compare this with the fact that $\int_a^b f(x) dx= -\int_b^a f(x) dx$). Thus, if $\mathbf{v}_1,\mathbf{v}_2, \cdots, \mathbf{v}_n \in \mathfrak X(M)$ are smooth vector fields, then

$$
\omega(\mathbf{v}_1, \mathbf{v}_2, \cdots, \mathbf{v}_n) = -\omega(\mathbf{v}_2, \mathbf{v}_1, \cdots, \mathbf{v}_n) \in C^\infty(M)
$$

The function $f$ that is spit out by $\omega$ (after it eats $n$ vector fields) can be thought of as assigning a value $f(p)$ to each point $p\in M$, where $f(p)$ is the volume of the parallelopiped spanned by the vectors $\mathbf{v}_1(p), \mathbf{v}_2(p), \cdots, \mathbf{v}_n(p)\in T_pM$. Thus, $\omega$ is sort of like a 'volume meter' affixed to each point of $M$. It is the authority on what counts as a positive volume, what counts as small/large, and so on. 

While a volume form is an *alternating* covariant $n$-tensor field, a <span class=accented>Riemannian metric</span>  $g$ is a *symmetric* covariant $2$-tensor field: 
$$
g(\mathbf{v}_1, \mathbf{v}_2) = g(\mathbf{v}_2, \mathbf{v}_1) \in C^\infty(M).
$$

Either of these forms can be written as a tensor, e.g., $g=g_{ij}dx^i \otimes dx^j$ (where the [Einstein summation](https://en.wikipedia.org/wiki/Einstein_notation) convention is used). But since the standard tensor notation doesn't reflect the symmetry/antisymmetry of the forms, we drop it in favor of notation that does:

<p>
\[
    \begin{align}
g &=  g_{ij}dx^i dx^j\\
\omega &= \omega_{i_1 i_2 \cdots i_n} dx^{i_1} \wedge dx^{i_2} \wedge \cdots \wedge dx^{i_n}
\end{align}
\]
</p>

This helps us remember that the $dx^i$ and $dx^j$ of $g$ can be swapped without consequence, whereas swapping the $dx^i$ and $dx^j$ of $\omega$ may or may not incur a sign-change depending on the [parity](https://en.wikipedia.org/wiki/Parity_of_a_permutation) of the permutation.

<!-- As does Lee's book, we will use $I$ as a shorthand for a multi-index set such as $i\_1 i\_2 \cdots i\_n$.  -->

With this notation, observe that if $\mathbf{v} = v^k \frac{\partial}{\partial x^k}$ and $\mathbf{w} = w^l \frac{\partial}{\partial x^l}$ where $(dx^i)\_{i}$ is the dual basis of $(\frac{\partial}{\partial x^i})\_i$, then

<p>
\[
    \begin{align}
g(\mathbf{v},\mathbf{w}) &= g_{ij} dx^i dx^j \left(v^k  \frac{\partial}{\partial x^k}, w^l \frac{\partial}{\partial x^l}\right) \\
 &= g_{ij}v^k w^l \ \left[dx^i  dx^j \left(\frac{\partial}{\partial x^k}, \frac{\partial}{\partial x^l}\right)\right] \\
&= g_{ij} v^k w^l \delta^i_k \delta^j_l \\
&= g_{ij} v^i w^j
    \end{align}
    \]
</p> 

Since it is a (pointwise) sum of (pointwise) products of $C^\infty(M)$ functions, $g_{ij} v^i w^j\in C^\infty(M)$. Observe that the metric tensor coefficients play a role similar to that of a weighting matrix $W \in \mathbb R^{n \times n}$ when defining an inner product in $\mathbb R^n$ as $\langle \mathbf{v}, \mathbf{w}\rangle\_W = v^\top W w$.

### Orthonormal Frames

Since the choice of a metric automatically endows a geometry to our manifold, it is expected that a(n essentially) unique volume form should result from it. Proposition 15.29 of Lee's book tells us that this is the case. But to get there, we first need to talk about frames.

A <span class=accented>local frame</span> of vector fields $(\mathbf{E}_i)\_{i=1}^n$ is a collection of contravariant (or tangent) vector fields in $\mathfrak X(U)$ such that $(\mathbf{E}_i(p))\_{i=1}^{n}$ is a basis of $T\_p M$ for all $p\in U\subseteq M$. A local frame is <span class=accented>orthonormal</span> if $g(\mathbf{E}\_i, \mathbf{E}\_j) = \delta\_{ij}$, where $\delta\_{ij}$ is the Kronecker delta considered as a constant-valued $C^\infty(U)$ function. A <span class=accented>global</span> frame is one that is defined on all of $M$, with $U=M$. 

The <span class=accented>dual coframe</span> to $(\mathbf{E}_i)\_{i=1}^n$ is the collection of covariant (or cotangent) vector fields $(\varepsilon^i)\_{i=1}^n$, such that $\varepsilon^i(\mathbf{E}_j) = \delta^i\_{j}$. These covariant vector fields are precisely the differential $1$-forms, so we take their tensor products to obtain bases for differential $k$-forms.

Now, suppose that we wanted to express $g$ in a coframe that is dual to an orthonormal one. Let 

<p>
\[
    \begin{align}
    g = g_{ij}dx^i dx^j = \tilde g_{ij} \varepsilon^i \varepsilon^j
    \end{align}
    \]
</p> 

We have then, that

<p>
\[
    \begin{align}
    \delta_{kl} = g(\mathbf E_k, \mathbf E_l) &= \tilde g_{ij} {\varepsilon}^i {\varepsilon}^j \left(\mathbf E_k, \mathbf E_l\right) \\
    &= \tilde g_{ij} {\varepsilon}^i \left(\mathbf E_k\right) {\varepsilon}^j \left(\mathbf E_l\right) \\
    &= \tilde g_{ij} \delta^i_k \delta^j_l  = \tilde g_{kl}
    \end{align}
    \]
</p> 

This means that the metric tensor, when expressed in a coframe dual to an orthonormal one, has the trivial representation: $g = \delta_{ij} \varepsilon^i \varepsilon^j$. By writing out the summation explicitly, this takes a more familiar form:

$$
g = (\varepsilon^1)^2 + (\varepsilon^2)^2 + \cdots + (\varepsilon^n)^2.
$$

<aside class=aside-center>
Here, $\varepsilon^i \varepsilon^j = \textrm{Sym}(\varepsilon^i \otimes \varepsilon^j) = \frac{1}{2}(\varepsilon^i \otimes \varepsilon^j + \varepsilon^j \otimes \varepsilon^i)$ is the symmetric product of tensors $-$ it is defined in a way that it forces the resulting tensor to be symmetric in its arguments, allowing us to drop the '$\otimes$'. Similarly, '$\otimes$' is replaced with '$\wedge$' to denote the alternating (or wedge, or exterior) product of tensors in order to capture the antisymmetry of a form.
</aside>

Given a local orthonormal frame of vector fields $(E_i)$, the Riemannian volume form can be uniquely defined as

<p>
\[
    \begin{align}
\omega = \varepsilon^1 \wedge \varepsilon^2 \wedge \cdots \wedge \varepsilon^n
    \end{align}
    \]
</p> 

so that $\omega(E_1, E_2, \cdots, E_n) = 1$. By definition, these statements should hold true for all the local orthonormal frames of $M$. This is to be compared with how $\mu([0,1]^n)=1$ for the Lebesgue measure in $\mathbb R^n$; $[0,1]^n$ is the parallelopiped spanned by the standard orthonormal basis vectors of $\mathbb R^n$.

Observe that the uniqueness of the Riemannian volume form follows from defining a smooth notion of *orthonormality* via a Riemannian metric. Also, the frames we have considered above need not be global, one might need to move to a different orthonormal frame (and thus, different representations of $g$ and $\omega$) when switching points on the manifold; nevertheless, the smoothness of these forms makes their descriptions in adjacent frames compatible. 
In the special case of a Lie group $G$, there is indeed a natural way to construct global orthonormal frames: we choose an orthonormal basis of $T_e G$ and extend it to a set of left/right-invariant vector fields.

[^nforms]: Rigorously, $\omega \in \Omega^n(M) = \Gamma (\Lambda^n T^*M)$, i.e., $\omega$ is 'a smooth section of the $n^{th}$ exterior power of the cotangent bundle of $M$'. There is a sense in which differential $k$-forms are elements of the dual space corresponding to the [module](https://en.wikipedia.org/wiki/Module_(mathematics)) of smooth $k$-vector fields on $M$, where instead of a field of scalars, we have a ring of $C^\infty(M)$ functions. So, it's no wonder that a dual vector and a vector should combine to give a scalar.

### Coordinate Frames

Engineers and applied mathematicians seldom work with the orthonormal frames. For one, it is rarely possible to find a coordinate chart of $M$, say $(U, \varphi)$ with $\varphi:U \rightarrow V \subseteq \mathbb R^n$, whose coordinate vector fields[^coordinate] are also orthonormal.

[^coordinate]: These can be thought of as the pushforwards of 'horizontal and vertical lines' under $\varphi^{-1}_*$.