---
title: "Integration on SO(3)"
date: 2024-06-07T11:27:55-04:00
draft: true
tags: ["Differential Geometry"]
bgImage: /post-images/lie_groups/so3.png
summary: I will construct the Haar measure for SO(3) and pull it back to the axis-angle parametrization of orthogonal matrices. The goal is to be able to integrate (and thereby define probability densities) on SO(3).
---

I will construct the Haar measure for $SO(3)$ and pull it back to the axis-angle parametrization of orthogonal matrices. The goal is to be able to integrate (and thereby define probability densities) on $SO(3)$.
My [earlier post](/posts/lie-groups_riemannian) on the Riemannian volume form is a prerequisite, though you could also just skip over any equations involving exterior calculus (marked by the use of the "$\wedge$" symbol) and focus on the bigger picture. The appendix of my [preprint](https://arxiv.org/abs/2508.12030) also explains integration on Lie groups.

## The Riemannian Volume Form 🪐
Let the basis for $\mathfrak{so}(3)$ be given by 

<p>
\[
\begin{align*}
\tilde E_1 &= \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 
\end{bmatrix} \\
\tilde E_2 &= \begin{bmatrix} 0 & 0 & 1 \\ 0 & 0 & 0 \\ -1 & 0 & 0 
\end{bmatrix} \\
\tilde E_3 &= \begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 0 
\end{bmatrix}
\end{align*}
\]
</p>

and the corresponding dual basis of $\mathfrak{so}(3)^*$ be given by $\lbrace \tilde \varepsilon^1, \tilde  \varepsilon^2, \tilde  \varepsilon^3\rbrace$, where we recall that $\tilde \varepsilon^i$ is like the `row vector' counterpart to $E_i$. In particular, $\tilde \varepsilon^i(\tilde E_j) = \delta_{ij}$. As usual, we will push these vectors and covectors around using the left-multiplication maps of the group to generate $\lbrace E_i\rbrace_{i=1}^3$ and $\lbrace \varepsilon^i\rbrace_{i=1}^3$. Once again, $\varepsilon^i(E_j) = \delta_{ij}$, but now $\delta_{ij}$ must be thought of as a smooth function on $SO(3)$ that is constant-valued.

This choice of basis is actually [rather special](https://arxiv.org/abs/2508.12030). If we say that this basis is orthonormal (thereby implicitly defining a left-invariant Riemannian metric on $SO(3)$), the corresponding Riemannian metric happens to be right-invariant, and thus, <span class=accented>bi-invariant</span>. These invariance properties extend to the corresponding [Haar measure](/posts/lie-groups_riemannian).
The Haar measure is (up to scaling) the canonical Riemannian volume form[^canonical]

$$
\mu = \textrm c\cdot \varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3
$$

[^canonical]: See John M Lee's *Introduction to Riemannian Manifolds* for an explanation of the term "canonical Riemannian volume form".

<aside class=aside-right>
In the Lie group sense, $\mu$ may be considered to be the "<span id="fnref:1"><a href="#fn:1" class="footnote-ref accented" role="doc-noteref">canonical</a></span>" volume form (up to a choice of scaling) since it respects the group structure. In the Riemannian geometric sense, $\mu$ is only "canonical" after we have first chosen a metric on $SO(3)$, namely the bi-invariant metric defined by $\lbrace E_i\rbrace_{i=1}^3$.
</aside>

where $\textrm c\in \mathbb R_{>0}$ is a normalizing constant that can be chosen such that

$$
\int_{SO(3)}\mu = 1.
$$

This normalization procedure makes sense precisely because $SO(3)$ is a compact manifold; we cannot normalize the Haar measure of, say, $SE(3)$, and must instead make do with an arbitrary choice of scaling. Note that $\mu$ is also a [probability measure](https://en.wikipedia.org/wiki/Probability_measure) and defines a 'uniform distribution' over the space of rotations.

As an engineer, my goal is to do calculations involving $\mu$. Sadly, this often requires us to step away from the intrinsic formulation and work with coordinate charts instead. The good news is that we can come back to the intrinsic formulation when we want to prove theorems and do manipulations that are intrinsic to $SO(3)$. It is important to remember that the coordinate-based approach that we will embark on will be oblivious to many of the topological and group-theoretic properties of $SO(3)$.

---

## [Axis-Angle Parametrization](https://en.wikipedia.org/wiki/Axis–angle_representation) 🪐

Recall that any rotation of $\mathbb R^3$ is given by an axis and an angle of rotation. These are represented by tuples of the form $(\mathbf u, \theta)$, where $\mathbf u\in S^2\subseteq \mathbb R^3$ is a unit vector[^s2] and $\theta\in [0, \pi]$. This gives the axis-angle parametrization of $SO(3)$:

[^s2]: $S^2$ is the $2$-sphere in $\mathbb R^3$, and the '$2$' refers to the fact that it is $2$-dimensional as a manifold.

<p>
\[
   \begin{align*}
   \exp^\wedge:\  S^2\times [0, \pi] &\to SO(3) \\
   (\mathbf u, \theta) &\mapsto \exp\big(\theta\, \mathbf u^\wedge\big)
    \end{align*}
\] 
</p>

where $\mathbf u^\wedge$ denotes the skew-symmetric matrix corresponding to $\mathbf u$ (and has nothing to do with the big wedge '$\wedge$' operation from earlier). We have something even better; the Cayley-Hamilton theorem can be used to simplify the infinite series involved in matrix exponentiation, and so the axis-angle parametrization can be written as

$$
\exp^\wedge(\mathbf u, \theta) = \mathbf I + (\sin\theta) \,\mathbf u^\wedge + (1-\cos\theta) \left(\mathbf u^\wedge\right)^2
$$

which is known to some as the <span class=accented>Rodriguez map</span>.

<aside class=aside-right>
Generally, the maps $(\ \cdot\ )^\wedge$ and $(\ \cdot\ )^\vee$ refer to the linear isomorphism between $\mathbb R^n$ and $\mathfrak{g}$ as vector spaces, with $\mathbf u^\wedge~=~u^i~\tilde E_i$. In the case of $\mathfrak{so}(3)$, the Lie bracket is related to the cross product of $\mathbb R^3$: 
<p>
\[
[\mathbf u^\wedge, \mathbf v^\wedge] = (\mathbf u \times \mathbf v)^\wedge
\]
</p>
and so is in fact a Lie algebra isomorphism.
</aside>

The following trick will greatly simplify our presentation. What prevents us from calling the above as the axis-angle *coordinates* (as opposed to *parametrization*) is that it fails to be bijective when $\theta = 0$ and $\theta = \pi$; all $0$-angle rotations are the same regardless of the axis of rotation, and $\pi$-angle rotations about $\mathbf u$ and $-\mathbf u$ are the same rotation. Either case, $\theta = 0$ and $\theta = \pi$, determines a $2$-dimensional submanifold of $S^2\times [0, \pi]$: 

<figure class=invertible style="max-width: 100%;">
<img src=/post-images/lie_groups/so3.png>
<figcaption>$S^2\times [0, \pi]$ is (homeomorphic to) a thick spherical shell</figcaption>
</figure>

and $\exp^\wedge$ maps this shell onto $SO(3)$.
Of course, I have greatly exaggerated the hole at the origin. This is because I want to emphasize the topological (rather than geometric) aspects of the axis-angle parametrization. 
The $\exp^\wedge$ map (i) glues the inner surface of this shell into a single point, and (ii) glues together each pair of antipodal points on the outer surface.
So, while the image of the $\theta = 0$ points is a single point in $SO(3)$ (namely, the identity element $e\in G$), the image of the $\theta = \pi$ points is a $2$-dimensional submanifold of $SO(3)$ (consisting of all the rotations by $\pi$). 
The aforementioned *trick* which we will use is that these lower-dimensional sets have measure zero under $\mu$, so we can peel them away from the spherical shell before doing integration and probability. No longer would we have an obstruction to bijectivity. 

We thus get a coordinate map $\psi: U\rightarrow \widetilde{SO(3)}$, where $\widetilde{SO(3)}$ is $SO(3)$ with $e$ and the $\pi$-rotations removed. The set $U$ is the interior of the ball of radius $\pi$ in $\mathbb R^3$ with the origin removed, and is diffeomorphic to $S^2\times (0, \pi)$.
With some more care, it can be shown that $\psi$ is itself a diffeomorphism, so that we can think about pulling back the Riemannian structure of $\widetilde{SO(3)}$ through $\psi$, establishing an isometry between $U$ and $SO(3)$[^submanifold]. In other words, we are going to talk about how the set $U$ must be morphed and squished for it to accurately represent the geometry of $SO(3)$ (equipped with its bi-invariant measure).

[^submanifold]: $\widetilde{SO}(3)$ is viewed as a Riemannian submanifold of $SO(3)$, $U$ is viewed as a smooth submanifold of $\mathbb R^3$ (no metric/measure is imposed on $U$ *a priori*).

### Pulling <span style="color:transparent; text-shadow: 0 0 0 var(--primary);">🔙</span> the Volume Form

The coordinate chart $U$ lets us use integration in $\mathbb R^3$ as a substitute for integration in $SO(3)$:[^ism_1]

<p>
\[
\begin{align*}
\int_{SO(3)} \mu &=  \int_{\psi^{-1}\big(\widetilde{SO}(3)\big)} \psi^*\mu\\
&= \int_{U} \psi^*\mu 
\end{align*}
\]
</p>

Consider the standard frame of $U\subseteq \mathbb R^3$, $\lbrace \frac{\partial}{\partial x^i}\rbrace_{i=1}^3$, and its dual coframe $\lbrace dx^i\rbrace_{i=1}^3$.
Any $3$ form in $U$ (and in particular, $\psi^*\mu$) can be expressed as $f\ dx^1 \wedge dx^2 \wedge dx^3$, where $f\in C^\infty(U)$ is a smooth function. Using Lemma 14.16 of Intro. to Smooth Manifolds,[^prop]

[^prop]: I don't apply Proposition 14.20 of Lee here since $(\varepsilon^i)_{i=1}^3$ are not a coordinate coframe. Nonetheless, we recover in this post a similar result for a non-coordinate frame.

<p>
\[
\psi^*\mu = \textrm c\ (\psi^*\varepsilon ^1)\wedge (\psi^*\varepsilon ^2)\wedge (\psi^*\varepsilon ^3)
\]
</p>

whereas the pullback $\psi^*\varepsilon ^i$ is given by

<p>
\[
    \big[\psi^*\varepsilon ^i\big]\Big(\frac{\partial}{\partial x^j} \Big) 
    =\varepsilon ^i\Big(\psi_* \frac{\partial}{\partial x^j} \Big)
    \]
    </p>

Actually, we will sneak in the definition of $\varepsilon^i$ here; since $\mu$ itself is defined via a pullback, we will do both of these pullbacks (from $e$ to $g$, and then from $g$ to $\psi^{-1}(g)$) in tandem[^chirik]:

<p>
\[
    \begin{align*}
    \big[\psi^*\varepsilon ^i\big]\Big(\frac{\partial}{\partial x^j} \Big) 
    &=\big[\psi^* (\mathcal L_{g^{-1}})^*\tilde \varepsilon ^i\big]\Big(\frac{\partial}{\partial x^j} \Big) \\
    &=\big[(\mathcal L_{g^{-1}} \circ \psi)^*\tilde \varepsilon ^i\big]\Big(\frac{\partial}{\partial x^j} \Big)\\
    &= \tilde \varepsilon ^i \Big((\mathcal L_{g^{-1}} \circ \psi)_*\frac{\partial}{\partial x^j} \Big)
   \end{align*}
\]
</p>

So, Proposition 14.9 can be used to yield

[^chirik]: This is eq. (12.3) of *Stochastic Models...Volume 2* by G.S. Chirikjian.

<p>
\[
    \psi^*\mu = \textrm c\ \textrm{det}(???)
    \]
    </p>

[^ism_1]: See eq. ($16.1$) in *Introduction to Smooth Manifolds* by John M Lee. -->