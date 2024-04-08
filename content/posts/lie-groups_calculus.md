---
title: "Lie Groups: A Tensor Calculus Perspective"
date: 2024-01-30T09:53:05-05:00
draft: true
showToc: true
TocOpen: false
---

In this post, I make use of tensor calculus to set up the devices of differentiation and integration on Lie groups. If you are seeking a more application-oriented approach and/or aren't all that interested in this sort of abstraction, [this book](https://link.springer.com/book/10.1007/978-0-8176-4944-9) has all the formulae worked out, and [my previous post](/posts/lie-groups_construction) introduces the idea of invariant metrics and measures on Lie groups. 
Note that I will be using the [Einstein summation](https://en.wikipedia.org/wiki/Einstein_notation) convention throughout.


# Riemannian Manifolds

### Lengths and Volumes

Let $M$ be an $n$-dimensional smooth manifold.
A covariant $2$-tensor field on $M$ is a bilinear map that takes $2$ smooth vector fields as its arguments and produces a smooth $C^\infty(M)$ function.[^2forms] A <span class=accented>Riemannian metric</span> is a covariant $2$-tensor field that is symmetric:

<p>
\[
    \begin{align}
    g(\mathbf{v}_1, \mathbf{v}_2) &= g(\mathbf{v}_2, \mathbf{v}_1) \in C^\infty(M),
    \end{align}
    \]
</p> 
and positive-definite:
<p>
\[
    \begin{align}
    g(\mathbf{v}_1, \mathbf{v}_1)(p) > 0 &\quad \Leftrightarrow \quad \mathbf{v}_1(p) \neq \mathbf 0.
    \end{align}
    \]
</p> 


[^2forms]: Formally, such an object is an element of $\Gamma (T^*M \otimes T^*M)$, i.e., it is 'a smooth section of the 2<sup>nd</sup> tensor power of the cotangent bundle of $M$'. There is a sense in which covariant $k$-tensor fields are elements of the dual space corresponding to the [module](https://en.wikipedia.org/wiki/Tensor_field#The_C%E2%88%9E(M)_module_explanation) of contravariant $k$-tensor fields on $M$, where instead of a *field* of scalars, we have a *ring* of $C^\infty(M)$ functions. With this linear algebraic perspective, we recognize that a vector and its dual should combine to give a scalar.

where $\mathbf{v}_1, \mathbf{v}_2 \in \mathfrak X(M)$ are smooth vector fields on $M$. At some point $p\in M$, the number $g(\mathbf{v}_1, \mathbf{v}_2)(p)$ is interpreted as the inner product between the tangent vectors $\mathbf{v}_1(p)$ and $\mathbf{v}_2(p)$, often written as $\langle \mathbf v_1, \mathbf v_2 \rangle_p \coloneqq g(\mathbf{v}_1, \mathbf{v}_2)(p)$.
With such a mathematical structure imposed on $M$, we call $(M,g)$ a <span class=accented>Riemannian manifold</span>. 

While a metric tensor is a *symmetric* covariant $2$-tensor field, a <span class=accented>volume form</span> $\omega$ is an *alternating* covariant $n$-tensor field, also called as a differential $n$-form. By combining its alternating property with its linearity, $\omega$ can be shown to be antisymmetric in its arguments.
That is, if $\mathbf{v}_1,\mathbf{v}_2, \cdots, \mathbf{v}_n \in \mathfrak X(M)$ are smooth vector fields, then

$$
\omega(\mathbf{v}_1, \mathbf{v}_2, \cdots, \mathbf{v}_n) = -\omega(\mathbf{v}_2, \mathbf{v}_1, \cdots, \mathbf{v}_n) = \nu \in C^\infty(M)
$$

The function $\nu$ that is spit out by $\omega$ (after it eats $n$ vector fields) assigns the volume $\nu(p)\in \mathbb R$ to the parallelopiped spanned by the vectors $\mathbf{v}_1(p), \mathbf{v}_2(p), \cdots, \mathbf{v}_n(p)\in T_pM$. Thus, $\omega$ is sort of like a 'volume meter' affixed to each point of $M$. It is the authority on what counts as a positive volume, what counts as a small or a large volume, and so on. Its antisymmetry can be compared with the fact that $\int_a^b f(x) dx= -\int_b^a f(x) dx$. 

Either of these maps can be written as a tensor in local coordinates, e.g., $g=g_{ij}dx^i \otimes dx^j$, where the [Einstein summation](https://en.wikipedia.org/wiki/Einstein_notation) convention is used and $g_{ij}\in C^\infty (M)$.
Since the standard tensor notation doesn't reflect the symmetry/antisymmetry of the tensors, one typically drops it in favor of notation that does:

<p>
\[
    \begin{align}
g &=  g_{i_1 i_2}dx^{i_1} dx^{i_2}\\
\omega &= \omega_{i_1 i_2 \cdots i_n} dx^{i_1} \wedge dx^{i_2} \wedge \cdots \wedge dx^{i_n}
\end{align}
\]
</p>

This helps us remember that the $dx^{i_1}$ and $dx^{i_2}$ of $g$ can be swapped without consequence, whereas swapping the $dx^{i_1}$ and $dx^{i_k}$ of $\omega$ may or may not incur a sign-change depending on the [parity](https://en.wikipedia.org/wiki/Parity_of_a_permutation) of the permutation.

<aside class=aside-center>
Here, $dx^i dx^j = \textrm{Sym}(dx^i \otimes dx^j) = \frac{1}{2}(dx^i \otimes dx^j + dx^j \otimes dx^i)$ denotes the symmetric product of tensors $-$ it is defined in a way that forces the resulting tensor to be symmetric in its arguments. Similarly, '$\wedge$' denotes the alternating (or wedge, or exterior) product of tensors, thereby capturing the antisymmetry of a differential form.
</aside>

<!-- As does Lee's book, we will use $I$ as a shorthand for a multi-index set such as $i\_1 i\_2 \cdots i\_n$.  -->

With this notation, observe that if $\mathbf{v} = v^k \frac{\partial}{\partial x^k}$ and $\mathbf{w} = w^l \frac{\partial}{\partial x^l}$ are vector fields on $M$, where $(\frac{\partial}{\partial x^i})\_i$ is the dual basis of $(dx^i)\_{i}$, then
<p>
\[
    \begin{align}
g(\mathbf{v},\mathbf{w}) &= g_{ij} dx^i dx^j \left(v^k  \frac{\partial}{\partial x^k}, w^l \frac{\partial}{\partial x^l}\right) \\
 &= g_{ij}v^k w^l \ \left[dx^i  dx^j \left(\frac{\partial}{\partial x^k}, \frac{\partial}{\partial x^l}\right)\right] \\
&= g_{ij} v^k w^l \delta^i_k \delta^j_l \\
&= g_{ij} v^i w^j.
    \end{align}
    \]
</p> 

Since it is a (pointwise) sum of (pointwise) products of $C^\infty(M)$ functions, $g_{ij} v^i w^j\in C^\infty(M)$. The metric tensor coefficients $(g_{ij})_{i,j=1}^n$ play a role similar to that of a weighting matrix $W \in \mathbb R^{n \times n}$ that is introduced when defining a non-standard inner product in $\mathbb R^n$, as $\langle \mathbf{v}, \mathbf{w}\rangle \coloneqq \mathbf{v}^\top W \mathbf{w}$.

### Frames

In the above expressions, we used a frame (a system of vector fields) that arises from a coordinate chart. However, there may arise situations where we prefer to work with a frame that is not only *not* induced by a coordinate chart, but also *cannot* be induced by a coordinate chart. The frame of left-invariant vector fields on a (non-Abelian) Lie group is a prime example of this.

<!-- Since the choice of a metric automatically endows a geometry to our manifold, it is expected that a(n essentially) unique volume form should result from it. Proposition 15.29 of Lee's book tells us that this is the case. But to get there, we first need to talk about frames. -->

A <span class=accented>local frame</span> in an open set $U$ of $M$ is a set of tangent (or contravariant) vector fields in $\mathfrak X(U)$, enumerated as $(\mathbf{E}_i)\_{i=1}^n$, such that $(\mathbf{E}_i(p))\_{i=1}^{n}$ is a basis of $T\_p M$ for all $p\in U\subseteq M$. A local frame is <span class=accented>orthonormal</span> if $g(\mathbf{E}\_i, \mathbf{E}\_j) = \delta\_{ij}$, where $\delta\_{ij}$ is the Kronecker delta considered as a constant-valued $C^\infty(U)$ function. A <span class=accented>global</span> frame is one that is defined on all of $M$, with $U=M$. 

<aside class=aside-center>
A frame is said to be <i>oriented</i> once we <i>order</i> it and decree that this ordering &ndash; as well as even permutations of it &ndash; will be considered as being 'positively oriented'. In high-school geometry, we learn that the $\textrm x - \textrm y - \textrm z$ basis is positively oriented by convention. In three dimensions, cyclic permutations like 

<p>
\[
    \textrm x - \textrm y - \textrm z \quad \mapsto \quad  \textrm y - \textrm z - \textrm x\]
    </p> 
    are precisely the even-parity permutations, which is why $\textrm y - \textrm z - \textrm x$ is considered to be positively oriented too.
</aside>

The <span class=accented>dual coframe</span> to $(\mathbf{E}_i)\_{i=1}^n$ is the collection of cotangent (or covariant) vector fields $(\varepsilon^i)\_{i=1}^n$, such that $\varepsilon^i(\mathbf{E}_j) = \delta^i\_{j}$. These cotangent vector fields form a basis for differential $1$-forms. We can take their tensor products to obtain a basis for covariant $k$-tensor fields: 

<p>
\[
    \begin{align}
\lbrace \varepsilon^{i_1} \otimes \varepsilon^{i_2} \otimes \cdots \otimes \varepsilon^{i_k}\ \vert\ 1\leq i_1, i_2, \cdots, i_k \leq n \rbrace
    \end{align}
    \]
</p> 

or their
[exterior](https://en.wikipedia.org/wiki/Exterior_algebra)/wedge products to obtain a basis for the space of differential $k$-forms:

<p>
\[
    \begin{align}
\lbrace \varepsilon^{i_1} \wedge \varepsilon^{i_2} \wedge \cdots \wedge \varepsilon^{i_k}\ \vert\ 1\leq i_1 < i_2 < \cdots < i_k \leq n \rbrace
    \end{align}
    \]
</p> 

<aside class=aside-center>
Observe that covariant $k$-tensor fields are a more general class of objects than differential $k$-forms, since the latter have the additional, special property of being <i>alternating</i>. This fact is reflected in the dimensions of their bases (notice the range of the indices in either case). Despite this important distinction, differential $k$-forms are often simply called '$k$-covectors'; a more precise term would be <i>alternating $k$-covectors</i>.
</aside>



In the coordinate coframe $(dx^i)\_{i=1}^n$, we expressed the metric tensor as $g = g_{ij}dx^i dx^j$.
Let's now try to express it in a local coframe $(\varepsilon^i)\_{i=1}^n$ 
on $U \subseteq M$ that is dual to an orthonormal one:

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

Given a local orthonormal frame of vector fields $(E_i)\_{i=1}^n$ whose dual coframe is $(\varepsilon^i)\_{i=1}^n$, the unique (up to choice of orientation) Riemannian volume form can be uniquely defined as

<p>
\[
    \begin{align}
\omega = \varepsilon^1 \wedge \varepsilon^2 \wedge \cdots \wedge \varepsilon^n
    \end{align}
    \]
</p> 

so that $\omega(E_1, E_2, \cdots, E_n) = 1$. The above statements will look identical in any of the local orthonormal frames of $M$.

### Coordinate Frames

The allure of orthonormal frames is that $g$ and $\omega$ can be represented quite succinctly in them. 
However, the existence of an orthonormal frame *that arises as the coordinate frame of a chart* is a very restrictive requirement. It is only fulfilled when the Riemannian manifold $(M, g)$ is locally flat. If we would rather work with a frame that arises from coordinates, then we must resort to computing the components of a non-flat metric tensor (one that is not simply the Kroenecker delta). Also see my post on [the non-flatness of the sphere](/posts/sphere).

Recall that if $M$ is a smooth manifold, then each point $p\in M$ has a smooth chart[^smooth_chart] $(U, \varphi)$ containing it. Let $\frac{\partial}{\partial x^i}\big\vert_{\varphi(p)}$ be the usual coordinate-wise partial derivative operators in $\mathbb R^n$, $\varphi (p) = q = (q_1, q_2, \dots, q_n)$, and $\varphi(U) = V \subseteq \mathbb R^n$.
Given $f\in C^\infty(V)$, the partial derivative operators of $\mathbb R^n$ operate on $f$ as follows:

[^smooth_chart]: ... i.e., a chart that ensures that the concept of differentiation on $M$ is well-defined.

<p>
\[
    \begin{align}
\frac{\partial}{\partial x^2}\Big\vert_{q} f = \lim_{h\rightarrow 0} \frac{f(q_1, q_2+h, \dots, q_n) - f(q_1, q_2, \dots, q_n)}{h}
    \end{align}
    \] 
</p>

The $i^{th}$ coordinate vector field of $V$ is defined as $\frac{\partial}{\partial x^i}\big\vert\_{(\ \cdot\ )}:V \rightarrow TV$. Thus, the coordinate vector fields $\left(\frac{\partial}{\partial x^i}\big\vert\_{(\ \cdot\ )}\right)_{i=1}^n$ constitute a <span class=accented>coordinate frame</span> of $TV$, visualized as a sort of a fisherman's net spread across $V$. 

Ultimately, we want a coordinate frame on $U$ and not on $V$. Since $\varphi$ is a diffeomorphism (by definition of a smooth chart), its differential $(\varphi\_*)\_p$ is an isomorphism (of vector spaces) between $T_p U$ and $T_q V$. The pushforward of the coordinate frame on $V$ under $\varphi\_\*^{-1}$ gives us a coordinate frame of $U$. By an abuse of notation, I and many others use $\left(\frac{\partial}{\partial x^i}\big\vert\_{(\ \cdot\ )}\right)_{i=1}^n$ to refer to either frame; the subscript, the point of evaluation, and/or the context will make it clear which frame is being used. This means that if $\tilde f\in C^\infty (U)$, then we write

<p>
\[
    \begin{align}
\frac{\partial}{\partial x^i}\Big\vert_{p} \tilde f &= \left((\varphi_*^{-1})_{\varphi(p)} \frac{\partial}{\partial x^i}\Big\vert_{\varphi(p)}\right) \tilde f\\
&= \frac{\partial}{\partial x^i}\Big\vert_{\varphi(p)} \tilde f \circ \varphi^{-1} = \frac{\partial}{\partial x^i}\Big\vert_{\varphi(p)} (\varphi^{-1 *} \tilde f).
    \end{align}
    \]
</p> 

where $\varphi^{-1 *} \tilde f$ is called the *pullback* of $f$ under $\varphi^{-1}$; it *pulls* the domain of $\tilde f$ back to $V$.

I reiterate that there are Riemannian manifolds where such a coordinate frame could never be orthonormal (i.e., have $g\_{ij}(p) = \delta_{ij}$ for all $p\in U$). Theorem 13.14 of Lee's *Introduction to Smooth Manifolds* says that this is only possible when $M$ is *locally flat*.

### Pullbacks

Let $f:M \rightarrow N$ be a diffeomorphism between manifolds (though it is possible to generalize the forthcoming discussion to other kinds of smooth maps).

Recall that tangent and cotangent vectors are dual to each other, and so are their '$k^{th}$ exterior powers', $k$-vector fields and differential $k$-forms. Whenever we have a morphism for an object going one way, we expect a dual morphism for the corresponding dual object going the other way. Using this intuition, we deduce that if $f\_\*: TM \rightarrow TN$ allows us to push forward vector fields, there must be a dual morphism $f^\*: T^\* N \rightarrow T^\* M$ that allows us to pull back covector fields. Similarly, $f^\*: \Omega^k(N) \rightarrow \Omega^k(M)$[^omega] pulls back differential forms from $N$ to $M$ (we use the same notation for either map, $f^\*$). 

[^omega]: The space of differential $k$-forms on $N$ is denoted by $\Omega^k(N)$, which is also the space $\Gamma (\Lambda^k T^* N)$ of smooth sections of the $k^{th}$ exterior power of the cotangent bundle, $T^\*N$. This notation is borrowed from Lee's book.

Importantly, this means that any metric or volume form on $N$ can be pulled back to define a metric or volume form on $M$. The covariant tensor field thus obtained on $M$ is called as the <span class=accented>pullback</span> of the covariant tensor field on $N$ under $f$.
For example, consider $M=S^2$ to be the unit $2$-sphere and $f$ to be its usual submersion into $N=\mathbb R^3$. Then, the pullback of the Euclidean ('dot product') metric $\bar g$ of $\mathbb R^3$ is called the *round metric*, and it is a bonafide Riemannian metric for $S^2$ (I compute its components in [the next post](/posts/sphere)). When the Euclidean metric is pulled back onto a submanifold $M\subseteq \mathbb R^3$ in this manner, the pullback metric is called the *induced metric* or the *first fundamental form* of $M$. More generally, we can pull back covariant tensor fields from arbitrary manifolds, as long as we have a smooth map onto it.

The pullback of a differential form is defined such that it must be in concordance with the pushforwards of vector fields. Specifically, if $\omega \in \Omega^k(N)$ is a differential $k$-form and $\mathbf{v}_1, \mathbf{v}_2, \cdots, \mathbf{v}_k \in \mathfrak X(M)$, then

<p>
\[
    \begin{align}
(f^*\omega)(\mathbf{v}_1, \mathbf{v}_2, \cdots, \mathbf{v}_k) = \omega(f_*\mathbf{v}_1, f_*\mathbf{v}_2, \cdots, f_*\mathbf{v}_k).
    \end{align}
    \]
</p> 

I like to read this as: $f^\*\omega$ eats vector fields on $M$ by imitating how $\omega$ eats the corresponding pushforward vector fields on $N$. Thus, $f^\*\omega$ is a differential $k$-form on $M$; the domain of $\omega$ has been pulled back by $f^\*$.

While we have fully characterized the pullback of differential forms, some concrete properties of the pullback map are invaluable for doing actual computations. We will demonstrate these properties by pulling back metrics and volume forms on Lie groups.

---

# Lie Groups

In the special case where the Riemannian manifold is a Lie group $G$ endowed with a left/right invariant metric, there is indeed a natural way to construct global orthonormal frames: we choose an orthonormal basis of $T_e G$ and extend it to a set of left/right-invariant vector fields. If $G$ is non-Abelian, then this frame *cannot* possibly be induced by a coordinate chart; also see [this](/posts/sphere/#a-word-of-caution).

### Invariant Metrics
Let $G$ be a Lie group, $e\in G$ its identity element, and $\mathfrak g$ its Lie algebra. We will conflate $\mathfrak g$ with $T_e G$ for convenience.
Consider an inner product on $\mathfrak g$, $\langle \cdot, \cdot \rangle\_e$, and use the Gram-Schmidt process to construct an orthonormal basis for $\mathfrak g$. Denote one such orthonormal basis by $(\tilde E_i)\_{i=1}^n$, where $\tilde E_i \in \mathfrak g$, so that $\langle \tilde E_i, \tilde E_j \rangle_e = \delta_{ij}$. Its corresponding dual basis is denoted as $(\tilde \varepsilon^i)\_{i=1}^n$, where $\tilde \varepsilon^i \in \mathfrak g^*$.
 We can then express $\langle \cdot, \cdot \rangle\_e$ by the tensor $\delta_{ij} \tilde \varepsilon^i \tilde \varepsilon^j$, since

 <p>
\[
    \begin{align}
 \delta_{ij} \tilde \varepsilon^i \tilde \varepsilon^j(\tilde E_l, \tilde E_m) &= \delta_{ij} \tilde \varepsilon^i(\tilde E_l) \tilde \varepsilon^j(\tilde E_m) \\
    &= \delta_{ij} \delta^i_l \delta^j_m = \delta_{lm}.
 \end{align}
    \]
</p> 

If a vector $\mathbf v \in \mathfrak g$ is expressed as $\mathbf v = v^i \tilde E_i$, then our inner product becomes the usual 'dot product' of vectors of the form $[v^1 \ \cdots\ v^n]^\top$. 

We [have already seen](/posts/lie-groups_construction) how this inner product can be extended to a left-invariant Riemannian metric on $G$; let's try to do this using the idea of pullbacks. The left-trivialization map ([as I like to call it](/posts/lie-groups/#representation-theory)) $\mathcal L_{g^{-1}}:G \rightarrow G$ maps $g$ to $e$. It should let us pull back covariant tensors from $T_e^* G$ to $T_g^* G$:

<p>
\[
    \begin{align}
\left(\mathcal L_{g^{-1}}^*\right)_g: T^*_e G &\rightarrow T^*_g G
    \end{align}
    \]
</p> 

Lee's book calls this the pointwise pullback map, or the cotangent map of $\mathcal L_{g^{-1}}$. Now, consider its operation on the inner product $\langle \cdot, \cdot \rangle\_e$:

<p>
\[
    \begin{align}
\left(\mathcal L_{g^{-1}}^*\right)_g \delta_{ij} \tilde \varepsilon^i \tilde \varepsilon^j (\tilde V, \tilde W) &= \delta_{ij} \tilde \varepsilon^i \tilde \varepsilon^j \left(\mathcal L_{g^{-1}_*} \tilde V, \mathcal L_{g^{-1}_*} \tilde W\right) \\
&= \delta_{ij} \tilde \varepsilon^i \left(\mathcal L_{g^{-1}_*} \tilde V\right) \tilde \varepsilon^j \left(\mathcal L_{g^{-1}_*} \tilde W\right) \\
&= \delta_{ij} \langle \mathcal L_{g^{-1}_*} \tilde V, \tilde E_i \rangle_e \langle \mathcal L_{g^{-1}_*} \tilde W, \tilde E_j \rangle_e 
    \end{align}
    \]
</p> 

where we use the fact that the dual coframe [is constructed using](/posts/differential-forms/#duality) inner products. The last statement can be taken as the definition of $\langle  \tilde V,  \tilde W \rangle_g$. Clearly, it doesn't have the trivial representation that $\langle \cdot, \cdot \rangle_e$ has. This is because we *chose* to work with an orthonormal basis of $T_e G$ to make things easier for us. Since $T_e G$ is a Lie algebra, an orthonormal basis for it can be found in textbooks and papers. Moreover, the left-invariant vector fields corresponding to this basis are orthonormal frames with respect to the left-invariant metric. Such frames may be difficult or cumbersome to construct at the other tangent spaces of $G$, so we resort to working with metric tensor coefficients there.

While <span class=accented>$(23)$</span> is a well defined tensor, we haven't seen its metric tensor coefficients yet. This is because we need to choose a (not necessarily orthonormal) coframe at $g$ in order to express $\langle \cdot, \cdot \rangle_g$. We will use a coordinate frame for this purpose. Suppose that we have a chart $(U, \varphi)$ containing $g$, such that $\varphi (U)=V\subseteq \mathbb R^n$. $\varphi^{-1}$ is a local parametrization of $G$ around $g$. We can then pull back $\delta_{ij} \tilde \varepsilon^i \tilde \varepsilon^j$ all the way back to $V$ using $\mathcal L_{g^{-1}} \circ \varphi^{-1}$. 

<!-- Let's see an example of why such a pullback can be helpful for computations.

### <span class=accented>Example:</span> $SO(3)$

Suppose $p\in G=SO(3)$ is a rotation, and $G$ is identified with the set of $3\times 3$ orthogonal matrices with determinant $1$.
Let's look for a local parameterization of $SO(3)$, $\psi: V \rightarrow SO(3)$, such that $V\subseteq \mathbb R^3$ is an open set and $p\in \psi(V)$. The so-called 'z-x-z' or '3-1-3' Euler angle parameterization is a sequence of three rotations:

<p>
\[
    \begin{align}
\psi(\alpha, \beta, \gamma) = R_z(\gamma) R_x(\beta) R_z(\alpha)
    \end{align}
    \]
</p> 

where

<p>
\[
    \begin{align}
R_z(\theta) = \begin{bmatrix} \cos \theta & -\sin \theta & 0 \\ \sin \theta & \cos \theta & 0 \\ 0 & 0 & 1 \end{bmatrix}
    \end{align}
    \]
</p> 

and $R_x(\theta)$ is defined similarly. -->