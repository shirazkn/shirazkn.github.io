---
title: "Euler-Poincaré Equations"
date: 2024-12-19T08:18:04-05:00
draft: true
---

Poincaré's [1901 paper](https://www.ma.ic.ac.uk/~dholm/classnotes/M3-4A16-Poincare1901.pdf)[^0] introduces (in just a humble 3 pages) the Euler-Poincaré equations, which are the specialization of the [Euler-Lagrange equations](/posts/symplectic/#variational-approach) to the case where <span>a Lie group $G$ acts on the configuration manifold $\mathcal Q$. In this case, vector fields on $\mathcal Q$ can be expressed in terms of the infinitesimal actions of the group, and the Euler-Lagrange equations reduce to the Euler-Poincaré equations.
In what follows, I work through Poincaré's paper in a painful amount of detail, without making too many [identifications](https://math.stackexchange.com/a/3415429).

[^0]: I'm grateful to my colleague <span class=accented>Jöel Bensoam</span> for introducing me to this paper (and to variational calculus)!

## ⌁ Describing Paths in $\mathcal Q$ 

We think of the space $\mathcal Q$ as being the <span class=accented>configuration space</span> of some dynamical system. It is assumed that a Lie group $G$ acts transitively on $\mathcal Q$, i.e., for any two points $q, q^\prime \in \mathcal Q$, there exists a (not necessarily unique) $g\in G$ such that $g\cdot q = q^\prime$. Given a basis $\lbrace \tilde E_i \rbrace_{i=1}^r$ for $\mathfrak g$, the group action induces a set of [vector fields](/posts/vector-fields) $\lbrace E_i\rbrace_{i=1}^r$ on $\mathcal Q$, as defined via

<p>
\[
[E_i f](q) = \lim_{t\rightarrow 0} \frac{f(\exp(t\tilde E_i)\cdot q) - f(q)}{t},
\]
</p>

where $f\in C^\infty(\mathcal Q)$ is an arbitrary function. For notational convenience, we will simply write 


<p>
\[
E_{i,q} = \frac{d}{d t} \left(\exp(t\tilde E_i)\cdot q\right)\Big\rvert_{t=0}.
\]
</p>

to mean the same thing, although one should rigorously define $E_i$ via its action on an arbitrary function, as we have done above.

<!-- ## ⌁ Trajectory -->

The map $\gamma:[a,b] \rightarrow \mathcal Q$ describes a <span class=accented>path in $\mathcal Q$</span>, possibly representing the trajectory of a dynamical system. Due to transitivity of the group action, we can express the "velocity" vectors of $\gamma$ as follows:[^4]

<p>
\[
    \begin{align*}
\gamma^\prime(s) \coloneqq d \gamma_s \left(\frac{\partial}{\partial t}\Big\rvert_{t=s}\right) &= \eta^i(s) E_i\rvert_{\gamma(s)} \\
\end{align*}
\]
</p>


where <span class=accented>$\eta^i(s)$</span> are some coefficient/component functions that describe the velocity of $\gamma$. 


## ⌁ Variation of $\gamma$

Denote the space of <span class=accented>paths on $\mathcal Q$</span> as $\mathcal P\mathcal Q$, so that $\gamma \in \mathcal P\mathcal Q$.
Consider a <span class=accented>family of paths</span> $\Gamma(\ \cdot\ , \lambda)$ such that $\Gamma(t, 0) = \gamma(t)$. As $\lambda$ is varied, we think of $\Gamma(\ \cdot\ , \lambda)$ as a path in $\mathcal P \mathcal Q$, i.e., a path through path space! We know that the derivatives of such paths-of-paths at $\lambda = 0$ should correspond bijectively to the tangent vectors in $T_{\gamma}\mathcal P \mathcal Q$:

<p>
\[
    \frac{\partial}{\partial\lambda} \Gamma (\ \cdot\ , \lambda)\Big\rvert_{\lambda=0} \in T_{\gamma}\mathcal P \mathcal Q.
\]
</p>

<aside class=aside-right>
Technically, we should write
$$
\textrm{d}\Gamma_{(t, 0)}\left(\frac{\partial}{\partial \lambda}\bigg\rvert_{\lambda=0}\right)\in T_{\gamma(t)} \mathcal Q
$$
where $\Gamma:[a,b]\times[c,d] \rightarrow \mathcal Q.$ By an abuse of notation, we will write $$\frac{\partial}{\partial\lambda}\Gamma(t, \lambda)\Big|_{\lambda = 0}$$ to refer to the foregoing object.
</aside>

But for each $t\in[a,b]$, this is nothing but a tangent vector of $\mathcal Q$:

<p>
\[
    \frac{\partial}{\partial\lambda} \Gamma (t, \lambda)\Big\rvert_{\lambda=0} \in T_{\gamma(t)}\mathcal Q.
\]
</p>

<!-- <aside class=aside-right>
Note that if $\mathcal Q$ is a vector space, then we can choose the (meta) path as $\Gamma (t, \lambda)= \gamma(t) + \lambda \delta \gamma(t)$. It is important to remember that the foregoing definition relies on vector addition.
</aside> -->

Thus, as we vary $t$, we obtain a <span class=accented>vector field along $\gamma$</span>. Let $\delta \gamma \in T_{\gamma} \mathcal P \mathcal Q$
(commonly referred to as a <span class=accented>variation of $\gamma$</span>) and $\Gamma$ a representative of it.[^5] It is both a vector in $T_{\gamma} \mathcal P \mathcal Q$ and a vector field (along $\gamma$) on $\mathcal Q$.
 Since it's a vector field, we know that $\delta \gamma$ can be expressed as


<p>
\[
\delta \gamma(t) 
=\xi^i(t) E_{i,\gamma(t)}.
\]
</p>

Now for the tricky part; any variation of $\gamma$ *induces* a corresponding <span class=accented>variation of $\gamma^\prime$</span>, which can in turn be expressed as a variation $\lbrace\delta \eta^i\rbrace_{i=1}^r$ of the coefficients $\lbrace\eta^i\rbrace_{i=1}^r$. Since the variational principle requires us to pass from the $n$-dimensional space $\mathcal Q$ to the $(n+r)$-dimensional space $\mathcal Q \times \mathfrak g$, we need additional constraints that relate $\delta \gamma$ to $\lbrace\delta \eta^i\rbrace_{i=1}^r$ in order to ensure that these variations are compatible.[^8] To put it differently, notice that since $\delta \gamma$ determines $\lbrace\delta \eta^i\rbrace_{i=1}^r$, we don't have any real freedom in choosing $\lbrace\delta \eta^i\rbrace_{i=1}^r$.

[^8]: An example showing the importance of constraints is as follows. We can use variational calculus to show that the shortest path between two points $\mathbf p,\mathbf p^\prime \in \mathbb R^n$ is a straight line. Since perturbations of the straight line $\gamma(t)= \mathbf p + t(\mathbf p^\prime-\mathbf p)$ that keep $\gamma(0)$ and $\gamma(1)$ fixed can only increase the length, we conclude that the straight line is indeed the shortest path. However, if we drop the constraint on $\gamma(0)$ and $\gamma(1)$, then there exists a perturbation that moves the points closer; any "constant path" of the form $\gamma(t) = \mathbf q$ for $\mathbf q \in \mathbb R^n$ is then a minimizer. Basically, we need to impose the constraint $\delta \gamma(0)=\delta \gamma(1) = 0$ to properly formulate the geometric problem we have in mind.

Annoyingly, Poincaré considers this matter a triviality. His (translated) paper reads "<span class=print>... and [one] can easily find</span>" before the end result is presented.[^3] 


[^5]:Since the variation lives in a tangent space of $\mathcal P \mathcal Q$, it should act on a functional $f:\mathcal P\mathcal Q \rightarrow \mathbb R$, i.e., a function that eats a path and spits out a number:
$$\delta\gamma\hspace{1pt}f = \frac{\partial}{\partial\lambda} f\left(\Gamma(\ \cdot\ , \lambda)\right)\Big\rvert_{\lambda=0} = \mathbf D f(\gamma) \cdot \delta \gamma,$$
wherein the last piece of notation is explained in Marsden and Ratiu's books, as well as in [my other post](/posts/symplectic).

<!-- ## ⌁ ️The Induced Variation in Velocity

The (meta) path can therefore be chosen as $\Gamma^i (t, \lambda)= \gamma^i(t) + \lambda [\delta \gamma]^i(t)$, where $\gamma^i \coloneqq q^i \circ \gamma$. If we modify the path, then we modify its velocity vectors as well.
The variation in velocity that is *induced* by $\delta \gamma$ will now be calculated.[^3] First, we know that $\delta \gamma$ can be expressed in two ways:

[^3]: Annoyingly, Poincaré considers this matter a triviality. His translated paper reads "*...and [one] can easily find...*" before the end result is presented.

<p>
\[
\delta \gamma(t) = [\delta \gamma]^i(t) \frac{\partial}{\partial q^i}\bigg\rvert_{\gamma(t)} = \xi^i(t) E_{i,\gamma(t)}.
\]
</p>

Letting either side eat a coordinate function, we get

<p>
\[
[\delta \gamma]^j(t) = \xi^i(t) E_{i,\gamma(t)}q^j = \xi^i(t) E_i^j(\gamma(t)).
\]
</p>

Differentiating the coordinate description of the (meta) path,

<p>
\[
\begin{align*}
\frac{d\Gamma^i}{dt}(s, \lambda) &= \frac{d\gamma^i}{dt}(s) + \lambda \frac{d[\delta \gamma]^i}{dt}(s)\\
&= \frac{d\gamma^i}{dt}(s) + \lambda \left[\frac{d}{dt}\left(\xi^j(t) E_j^i(\gamma(t))\right)\right](s)\\
&= \frac{d\gamma^i}{dt}(s) + \lambda\frac{d\xi^j}{dt}(s)E_j^i(\gamma(s)) + \lambda \xi^j(s) \frac{d (E_j^i \circ \gamma)}{dt}(s).
\end{align*}
\]
</p>


What is that derivative in the last term? It is nothing but $\gamma^\prime(s)$ acting on the function $E_j^i$; use the definition of a pushforward. Now, $\gamma^\prime(s) = \eta^k(s) E_{k,\gamma(s)}$, whereas $E_j^i = E_j q^i$, so 

<p>
\[
    \begin{align*}
    \frac{d (E_j^i \circ \gamma)}{dt}(s) &= \eta^k(s) E_{k,\gamma(s)}(E_j q^i)\\
    &= \eta^k(s) [E_{k}, E_j]_{\gamma(s)} q^i + \eta^k(s) E_{j,\gamma(s)}(E_k q^i)\\
     &= \eta^k(s) \kappa_{k,j}^r E_{r}^i + \eta^k(s) E_{j,\gamma(s)}(E_k q^i)
    \end{align*}
\]
</p>

??

### Formulae: 

$$E_i^j(\gamma(t)) = \[E_i q^j\](\gamma(t))$$

<p>
\[
\gamma^\prime(s) = \frac{d\gamma^i}{dt}(s) \frac{\partial}{\partial q^i}\bigg\rvert_{\gamma(s)} = 
\eta^j(s) E_j^i \frac{\partial}{\partial q^i}\bigg\rvert_{\gamma(s)}
\]
</p> -->

[^3]: A somewhat more detailed account is given in Marsden and Ratiu's book <span class=tertiary>(Thm. 13.5.3 of Intro. to Mechanics \& Symmetry)</span>, although it too uses too many identifications for my liking. Note that Marsden and Ratiu use $\delta \xi$ instead of $\delta \eta$ and $\dot \eta$ instead of 


<!-- = [\delta \gamma]^i(t) \frac{\partial}{\partial q^i}\bigg\rvert_{\gamma(t)} =  -->
<!-- Letting either side eat a coordinate function, we get

<p>
\[
[\delta \gamma]^j(t) = \xi^i(t) E_{i,\gamma(t)}q^j = \xi^i(t) E_i^j(\gamma(t)). \]
</p> -->


## ⌁ Variation of $\lbrace\eta^i\rbrace_{i=1}^r$


We say that $\Gamma$ is a *representative* of $\delta \gamma$ in the sense that it satisfies $\frac{\partial}{\partial\lambda}\Gamma(\cdot, \lambda)\big|_{\lambda=0}=\delta \gamma$ and $\Gamma(t, 0)=\gamma(0)$. In particular, its first-order partial derivative wrt $\lambda$ gives the variation vector field:

<p>
\[
\begin{align*}
\delta \gamma(t)  &= \frac{\partial}{\partial \lambda} 
\Gamma(t, \lambda)\Big\rvert_{\lambda=0} = \xi^i(t)E_{i,\gamma(t)}.
\end{align*}
\]
</p>
 
<!-- Near some point $s \in \mathbb R$ of the $t$-space, this curve has the following linear approximation

$$\Gamma(t, \lambda) \approx \exp(\lambda \xi^i(t) \tilde E_i)\exp({\small (t-s)\hspace{1pt}}\eta^j(t) \tilde E_j)g(s)\cdot p.$$ -->

From here, we can specialize to matrix Lie groups and finish the argument mechanically, as done in Theorem 13.5.3 of Marsden and Ratiu's *Introduction to Mechanics and Symmetry*. However, I will first attempt to do the general version of the proof, which needs some additional Riemannian geometric tools (at no expense of generality). The reader may supplement what follows with Lee's *Introduction to Riemannian Manifolds* (*Lee IRM*) or Cheeger and Ebin's *Comparison Theorems in Riemannian Geometry*. 

Consider an affine torsion-free connection $\nabla$ on $\mathcal Q$.
The curve $\gamma(t)$ defines the [covariant derivative](/posts/sphere) operator, $D_t(\hspace{1pt}\cdot\hspace{1pt})$. Using the *Symmetry Lemma* [Lemma 6.2, Lee IRM], we have

<p>
\[
\begin{align*}
D_t\left[\frac{\partial}{\partial \lambda}\Gamma(t, \lambda)\Big|_{\lambda=0}\right](s) =  D_{\lambda} \left[\frac{\partial}{\partial t}\Gamma(t, \lambda)\Big|_{t=s}\right](0).
\end{align*}
\]
</p>

The idea is that we need to relate the left-hand side to $\dot\xi^i$ and the right-hand side to $\delta \eta^i$.
The left-hand side is[^technicality]

[^technicality]: Instead of writing $\nabla_{\gamma^\prime(t)}E_{i,\gamma(t)}$ we should properly extend either vector field to an open set of $\mathcal Q$ before evaluating the derivative. Nevertheless, we will ignore this technicality since it does not matter [Lee IRM].

<p>
\[
\begin{align*}
D_t\delta \gamma(s)  &=  \dot\xi^i(s)E_{i,\gamma(s)} + \xi^i(s)\nabla_{\gamma^\prime(s)}E_{i,\gamma(s)}\\
&=  \dot\xi^i(s)E_{i,\gamma(s)} + \xi^i(s)\eta^j(s)\nabla_{E_{j,\gamma(s)}}E_{i,\gamma(s)}.
\end{align*}
\]
</p>

<!-- 
Since the notation is getting cumbersome, we can omit the arguments and write $E_{i}$ instead of $E_{i,\gamma(t)}$:
<p>
\[
\begin{align*}
D_t\delta \gamma  &=   \dot\xi^iE_{i} + \xi^i\eta^j\nabla_{E_{j}}E_{i}.
\end{align*}
\]
</p> -->

To work out the right-hand side of the symmetry lemma, we need one last definition. Notice that we haven't properly defined $\lbrace\delta \eta^i\rbrace_{i=1}^r$ yet! The pushforward of $\frac{\partial}{\partial t}$ under $\Gamma$ is a vector field on $\mathcal Q$ that, on $\gamma$, coincides with $\gamma^\prime$. Let it be defined by 

$$
\textrm{d}\Gamma_{(t, \lambda)}\left(\frac{\partial}{\partial t}\bigg\rvert_{(t,\lambda)}\right)
= \eta^i(t, \lambda)E_{i,\Gamma(t,\lambda)}$$

such that $\eta^i(t,0)=\eta^i(t)$.
Then, we have

<p>
\[
\begin{align*}
D_{\lambda} &\left[\eta^i(s, \lambda)E_{i,\Gamma(s,\lambda)}\right](0) \\&= \frac{\partial }{\partial\lambda} \eta^i(s, \lambda)\Big|_{\lambda=0}E_{i,\Gamma(s,0)} + \eta^i(s, 0) \nabla_{\delta \gamma(s)}E_{i,\Gamma(s,0)}
\\&= \delta \eta^i(s)E_{i,\gamma(s)} + \eta^i(s)\nabla_{\delta \gamma(s)}E_{i,\gamma(s)}\\&= \delta \eta^i(s)E_{i,\gamma(s)} + \xi^j(s)\eta^i(s)\nabla_{E_{j,\gamma(s)}}E_{i,\gamma(s)}
\\&= \delta \eta^i(s)E_{i,\gamma(s)} \\&\qquad+ \xi^j(s)\eta^i(s)\left(\nabla_{E_{i,\gamma(s)}}E_{j,\gamma(s)} - [{E_{i,\gamma(s)}}, E_{j,\gamma(s)} ]\right).
\end{align*}
\]
</p>

wherein, the last equality (as well as the symmetry lemma itself) follows from the connection being torsion-free.
Hence, the symmetry lemma becomes

<p>
\[
\begin{align*}
   \dot\xi^i(s)E_{i,\gamma(s)} &= \delta \eta^i(s)E_{i,\gamma(s)} - [\eta^i(s){E_{i,\gamma(s)}}, \xi^j(s)E_{j,\gamma(s)} ]
\end{align*}
\]
</p>

Finally, we have something that agrees with Poincaré's note as well as Marsden and Ratiu's (matrix algebraic) derivation. 

---


## Appendices

Here are some alternative ways to set up and derive the Euler-Poincaré equations.

### Computation in Coordinates

Let $\lbrace q^i\rbrace_{i=1}^n$ be coordinates on a subset of $\mathcal Q$. We can express $E_i$ in terms of the [coordinate frame](/posts/lie-groups_calculus/#-coordinate-frames) $\lbrace {\partial}/{\partial q^i}\rbrace_{i=1}^n$, as 
$$E_i = E_i^j \frac{\partial}{\partial q^j},$$
where each $E_i^j \in C^\infty(\mathcal Q)$ is a coordinate function.
Letting $E_i$ act on the coordinate function $q^j$, we get

<!-- 
[^1]: Note that by specifying how the vector field $E_i$ acts on an arbitrary function $f$, we have completely characterized $E_i$. -->

$$
E_i q^j = E_i^k \frac{\partial q^j}{\partial q^k} = E_i^j,
$$

which tells us how to compute the coefficients of $E_i$ -- just feed it the coordinate functions. Returning to the definition of $\gamma^\prime(s)$, we get:

$$\gamma^\prime(s) = d \gamma_s \left(\frac{\partial}{\partial t}\Big\rvert_{t=s}\right) = \eta^i(s) E_i^j(\gamma(s)) \frac{\partial}{\partial q^j}\Big\vert_{\gamma(s)}$$

Letting the middle expression act on the coordinate function $q^k$,
we get

[^4]: Here, $i$ sums from $1$ to $r$ whereas $j$ sums from $1$ to $n$; henceforth, this must be inferred from context.<!-- The use of $i$ vs. $j$ is not a convention (i.e., does not apply to the rest of the post).  --> Also observe that $r\geq n$ due to transitivity of the group action.

<p>
\[
    \begin{align*}
d \gamma_s \left(\frac{\partial}{\partial t}\Big\rvert_{t=s}\right)(q^k) &= \frac{\partial}{\partial t}\Big\rvert_{t=s}(q^k \circ\gamma)=\frac{d}{dt}(q^k\circ \gamma)(t)\Big|_{t=s},
\end{align*}
\]
</p>

whereas letting the right-hand side eat $q^k$, we get

<p>
\[
   \begin{align*}
\eta^i(s) E_i^j(\gamma(s)) \frac{\partial q^k}{\partial q^j}\Big\vert_{\gamma(s)} = \eta^i(s) E_i^k(\gamma(s)).
\end{align*} 
\]
</p>

Denoting $q^j \circ \gamma$ as <span class=accented>$\gamma^j$</span>, we can finally put everything together:

<p>
\[
\frac{d \gamma^k}{dt}(s) = \eta^i(s) E_{i,\gamma(s)} \gamma^k(s).
\]

This expression can be found in Poincaré's paper (linked at the beginning of the post).

### Using Matrix Algebra
We can choose $\Gamma$ to be 

$$\Gamma(t, \lambda) = \exp(\lambda \xi^i(t) \tilde E_i)\cdot\gamma(t)$$

since it satisfies the conditions for being a representative of $\delta \gamma$. Actually, we can do something more;
we can express $\gamma(t)$ as $g(t) \cdot p$, where $p\in \mathcal Q$ is a some distinguished point (that may be called the "origin" of $\mathcal Q$) and $g(t)$ is a curve of actions in $G$. This means that

$$\Gamma(t, \lambda) = \exp(\lambda \xi^i(t) \tilde E_i)g(t)\cdot p.$$


<!-- <aside class=aside-center> -->
<!-- <b>Non-uniqueness of $g(t)$</b>:  -->
The curve $g$ that generates $\gamma$ in this manner is <u>not unique</u> even after we have fixed some point $p$. To see why, one can consider $G=\mathbb R^3 \times \mathbb R^3$ and $\mathcal Q = \mathbb R^3$. Nevertheless, since we are going to probe <i>all</i> possible variations of $\gamma$, we only need to worry about the "surjectivity" of this formulation, rather than its "injectivity". Surjectivity follows from our assumption of the group action being transitive.
<!-- </aside> -->

If $G$ is a matrix Lie group, the expression

<p>
\[
\begin{align*}
\frac{d}{d t}&\left(g(t)^{-1}\left( \frac{\partial}{\partial \lambda} 
\Gamma(t, \lambda)\Big\rvert_{\lambda=0}\right)\right) 
\end{align*}
\]
</p>

can be viewed from a purely matrix-algebraic lens. A matrix-algebraic version of the "symmetry lemma" follows from the commutativity of partial derivatives. This is what Marsden and Ratiu do in their book, so I leave the remaining details to them.

