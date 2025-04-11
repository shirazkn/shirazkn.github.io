---
title: "Euler-Poincaré Equations"
date: 2024-12-19T08:18:04-05:00
draft: true
---

Poincaré's [1901 paper](https://www.ma.ic.ac.uk/~dholm/classnotes/M3-4A16-Poincare1901.pdf)[^0] introduces (in just a humble 3 pages) the Euler-Poincaré equations, which are the specialization of the Euler-Lagrange equations to the case where <span>a Lie group $G$ acts on the configuration manifold $\mathcal Q$. In this case, vector fields on $\mathcal Q$ can be expressed in terms of the infinitesimal actions of the group, and the Euler-Lagrange equations reduce to the Euler-Poincaré equations.
In what follows, I work through Poincaré's paper in a painful amount of detail, without making too many [identifications](https://math.stackexchange.com/a/3415429).

[^0]: I thank my colleague <span class=accented>Jöel Bensoam</span> for introducing me to this paper (and to variational calculus)!

## ⌁ Describing Paths in $\mathcal Q$ 

Let $\lbrace q^i\rbrace_{i=1}^n$ be coordinates on a subset of $\mathcal Q$, where $\mathcal Q$ may be thought of as the <span class=accented>configuration space</span> of some dynamical system. We suppose that a Lie group $G$ acts transitively on $\mathcal Q$, i.e., for any two points $q, q^\prime \in \mathcal Q$, there exists a (not necessarily unique) $g\in G$ such that $g\cdot q = q^\prime$. Given a basis $\lbrace \tilde E_i \rbrace_{i=1}^r$ for $\mathfrak g$, the group action induces a set of [vector fields](/posts/vector-fields) $\lbrace E_i\rbrace_{i=1}^r$ on $\mathcal Q$, as defined via

<p>
\[
[E_i f](q) = \lim_{t\rightarrow 0} \frac{f(\exp(t\tilde E_i)\cdot q) - f(q)}{t},
\]
</p>

where $f\in C^\infty(\mathcal Q)$ is an arbitrary function. For notational convenience, we will simply write 


<p>
\[
E_{i,q} = \frac{d}{d t} \left(\exp(t\tilde E_i)\cdot q\right)\Big\rvert_{t=0} 
\]
</p>

to mean the same thing.
We can express $E_i$ in terms of the [coordinate frame](/posts/lie-groups_calculus/#-coordinate-frames) as $E_i = E_i^j \frac{\partial}{\partial q^j}$, where each $E_i^j \in C^\infty(\mathcal Q)$ is a coordinate function.
Letting this act on the coordinate function $q^j$, we get

<!-- 
[^1]: Note that by specifying how the vector field $E_i$ acts on an arbitrary function $f$, we have completely characterized $E_i$. -->

$$
E_i q^j = E_i^k \frac{\partial q^j}{\partial q^k} = E_i^j,
$$

which tells us how to compute the coefficients. 

<!-- ## ⌁ Trajectory -->

Now let $\gamma:[a,b] \rightarrow \mathcal Q$ be a <span class=accented>path in $\mathcal Q$</span>, possibly representing the trajectory of a dynamical system. Due to transitivity of the group action, we can express the "velocity" vectors of $\gamma$ as follows:[^4]

<p>
\[
\dot \gamma(s) \coloneqq d \gamma_s \left(\frac{\partial}{\partial t}\Big\rvert_{t=s}\right) = \eta^i(s) E_i\rvert_{\gamma(s)} = \eta^i(s) E_i^j \frac{\partial}{\partial q^j}\Big\rvert_{\gamma(s)},
\]
</p>

where $\eta^i(s)$ are some coefficient/component functions. But we can also express $\dot \gamma(s)$ in a coordinate frame: $
\dot \gamma(s) = [\dot \gamma (s)]^i \frac{\partial}{\partial q^i}\big\rvert_{\gamma(s)}.$ Letting this guy act on the coordinate function $q^j$, we have

[^4]: Here, $i$ sums from $1$ to $r$ whereas $j$ sums from $1$ to $n$; henceforth, this must be inferred from context.<!-- The use of $i$ vs. $j$ is not a convention (i.e., does not apply to the rest of the post).  --> Also observe that $r\geq n$ due to transitivity of the group action.

<p>
\[
    \begin{align*}
\dot \gamma(s)(q^j) &= [\dot \gamma (s)]^i \frac{\partial}{\partial q^i}\Big\rvert_{\gamma(s)}(q^j) = [\dot \gamma(s)]^j
\end{align*}
\]
</p>

whereas by the definition of the pushforward,

$$
\dot \gamma(s)(q^j) = d \gamma_s \left(\frac{\partial}{\partial t}\Big\rvert_{t=s}\right)(q^j) = \left(\frac{\partial}{\partial t}\Big\rvert_{t=s}\right)(q^j \circ \gamma).
$$

Denoting $q^j \circ \gamma$ as $\gamma^j$, we can finally put everything together:

<p>
\[
\frac{d \gamma^j}{dt}(s) = [\dot \gamma(s)]^j = \eta^i(s) E_i^j = \eta^i(s) E_i(q^j).
\]

## ⌁ Variation of $\gamma$

Denote the space of <span class=accented>paths on $\mathcal Q$</span> as $\mathcal P\mathcal Q$, so that $\gamma \in \mathcal P\mathcal Q$.
Consider a <span class=accented>family of paths</span> $\Gamma(\ \cdot\ , \lambda)$ such that $\Gamma(t, 0) = \gamma(t)$. As $\lambda$ is varied, we think of $\Gamma(\ \cdot\ , \lambda)$ as a path in $\mathcal P \mathcal Q$ -- a path through path space! We know that the derivatives of such paths-of-paths at $\lambda = 0$ should correspond bijectively to the tangent vectors in $T_{\gamma}\mathcal P \mathcal Q$:

<p>
\[
    \frac{d}{d\lambda} \Gamma (\ \cdot\ , \lambda)\Big\rvert_{\lambda=0} \in T_{\gamma}\mathcal P \mathcal Q.
\]
</p>

<aside class=aside-right>
Technically, we should write
$$
\textrm{d}\Gamma_{(t, 0)}\left(\frac{\partial}{\partial \lambda}\bigg\rvert_{\lambda=0}\right)\in T_{\gamma(t)} \mathcal Q
$$
where $\Gamma:[a,b]\times[c,d] \rightarrow \mathcal Q.$
</aside>

But for each $t\in[a,b]$, this is nothing but a tangent vector of $\mathcal Q$:

<p>
\[
    \frac{d}{d\lambda} \Gamma (t, \lambda)\Big\rvert_{\lambda=0} \in T_{\gamma(t)}\mathcal Q.
\]
</p>

<!-- <aside class=aside-right>
Note that if $\mathcal Q$ is a vector space, then we can choose the (meta) path as $\Gamma (t, \lambda)= \gamma(t) + \lambda \delta \gamma(t)$. It is important to remember that the foregoing definition relies on vector addition.
</aside> -->

Thus, as we vary $t$, we obtain a <span class=accented>vector field along $\gamma$</span>. Let $\delta \gamma \in T_{\gamma} \mathcal P \mathcal Q$ be such a vector field, although $\delta \gamma$ is more commonly referred to as a <span class=accented>variation of $\gamma$</span>.[^5] Since it's a vector field, we know that $\delta \gamma$ can be expressed as


<p>
\[
\delta \gamma(t) 
=\xi^i(t) E_{i,\gamma(t)}.
\]
</p>

Now for the tricky part; any variation of $\gamma$ *induces* a corresponding <span class=accented>variation of $\dot\gamma$</span>, which can in turn be expressed as a variation $\delta \eta$ of the coefficients $\lbrace\eta^i\rbrace_{i=1}^r$. Since the variational principle requires us to pass from the $n$-dimensional space $\mathcal Q$ to the $(n+r)$-dimensional space $\mathcal Q \times \mathfrak g$, we need additional constraints that relate $\delta \gamma$ to $\delta \eta$ in order to ensure that these variations are compatible.[^8] Notice that since $\delta \gamma$ determines $\delta \eta$, we don't have any real freedom in choosing $\delta \eta$.

[^8]: This can be compared to how one would go about using variational calculus to show that the shortest path between two points $p,p^\prime \in \mathbb R^n$ is a straight line. Perturbations of the straight line that keep the endpoints fixed can only increase the length (hence, we conclude that the straight line is indeed the shortest path). However, if we drop the constraint on $p^\prime$, then there exists a perturbation that moves the points closer; the minimizer in this case is the "constant path" $\gamma(t) = p$.

Annoyingly, Poincaré considers this matter a triviality. His (translated) paper reads "<span class=print>... and [one] can easily find</span>" before the end result is presented.[^3] 


[^5]:Since the variation lives in a tangent space of $\mathcal P \mathcal Q$, it should act on a functional $f:\mathcal P\mathcal Q \rightarrow \mathbb R$, i.e., a function that eats a path and spits out a number:
$$\delta\gamma\hspace{1pt}f = \frac{d}{d\lambda} f\left(\Gamma(\ \cdot\ , \lambda)\right)\Big\rvert_{\lambda=0} = \mathbf D f(\gamma) \cdot \delta \gamma,$$
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


What is that derivative in the last term? It is nothing but $\dot \gamma(s)$ acting on the function $E_j^i$; use the definition of a pushforward. Now, $\dot\gamma(s) = \eta^k(s) E_{k,\gamma(s)}$, whereas $E_j^i = E_j q^i$, so 

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
\dot \gamma(s) = \frac{d\gamma^i}{dt}(s) \frac{\partial}{\partial q^i}\bigg\rvert_{\gamma(s)} = 
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

Notice that we can choose $\Gamma$ to be 

$$\Gamma(t, \lambda) = \exp(\lambda \xi^i(t) \tilde E_i)\cdot\gamma(t)$$

Actually, we can do something more than this; we can write $\gamma(t)$ as $g(t) \cdot p$, where $p\in \mathcal Q$ is a some distinguished point that may be called the "origin" of $\mathcal Q$. This means that

$$\Gamma(t, \lambda) = \exp(\lambda \xi^i(t) \tilde E_i)g(t)\cdot p$$

which has effectively decomposed the $\lambda$ and $t$ parts. Near some point $s \in \mathbb R$ of the parameter (i.e., $t$-)space, this curve has the following linear approximation

$$\Gamma(t, \lambda) \approx \exp(\lambda \xi^i(t) \tilde E_i)\exp({\small (t-s)\hspace{1pt}}\eta^j(t) \tilde E_j)g(s)\cdot p$$


<aside class=aside-center>
<!-- <b>Non-uniqueness of $g(t)$</b>:  -->
The curve $g$ that generates $\gamma$ in this manner is <u>not unique</u> even after we have fixed some point $p$ (to see why, consider $G=SO(3)$ and $\mathcal Q = S^2$, the unit vectors of $\mathbb R^3$). Nevertheless, since we are going to probe <i>all</i> possible variations of $\gamma$, we only need to worry about the "surjectivity" of this formulation, rather than its "injectivity".
</aside>
 

Its first-order partial derivative wrt $\lambda$ gives the variation vector field:

<p>
\[
\begin{align*}
\delta \gamma(t)  &= \frac{\partial}{\partial \lambda} 
\Gamma(t, \lambda)\Big\rvert_{\lambda=0}\\
&= \frac{\partial}{\partial \lambda}\exp(\lambda \xi^i(t) \tilde E_i)g(t)\cdot p\Big\rvert_{\lambda=0}.
\end{align*}
\]
</p>

Let $L_g(p) \coloneqq g\cdot p$ denote the left action of $g$ on $p$.
Then, we have 

<p>
\[
    \begin{align*}
    dL_{g(t)^{-1}}\left(\delta \gamma (t)\right) &= \frac{\partial}{\partial \lambda}\left(g(t)^{-1}\exp(\lambda \xi^i(t) \tilde E_i)g(t)\right)\cdot p\Big\rvert_{\lambda=0} \\
    &= \frac{\partial}{\partial \lambda}\exp\left(\lambda Ad_{g(t)^{-1}}\left(\xi^i(t)\tilde E_i\right)\right)\cdot p\Big\rvert_{\lambda=0} =  Ad_{g(t)^{-1}} \xi^i(t) E_{i,p}.
    \end{align*}
\]
</p>

where $Ad_{g(t)^{-1}} E_{i,p}$ is understood as being the vector field generated by $Ad_{g(t)^{-1}}\tilde E_{i}$, evaluated at $p$. In this sense, $p$ serves as the "identity element" of $\mathcal Q$, such that (just like we do on Lie groups) we will pull all velocities back to $T_p\mathcal Q$. Since $dL_{g(t)^{-1}}\left(\delta \gamma (t)\right)\in T_p\mathcal Q$ for all $t$, we can differentiate w.r.t. $t$ to get

<p>
\[
\frac{d}{d t}\left(dL_{g(t)^{-1}}\left( \frac{\partial}{\partial \lambda} 
\Gamma(t, \lambda)\Big\rvert_{\lambda=0}\right)\right) = ...
\]
</p>

### Using Matrix Algebra
Specializing to matrix Lie groups, we have

<p>
\[
\begin{align*}
\frac{d}{d t}&\left(g(t)^{-1}\left( \frac{\partial}{\partial \lambda} 
\Gamma(t, \lambda)\Big\rvert_{\lambda=0}\right)\right) \\
&= \frac{d}{d t}\left(g(t)^{-1}\right)\left( \frac{\partial}{\partial \lambda} 
\Gamma(t, \lambda)\Big\rvert_{\lambda=0}\right)
\end{align*}
\]
</p>



--- 

$$
\dot \gamma (t) = d \gamma_t \left(\frac{\partial}{\partial t}\Big\rvert_{t=s}\right) = \eta^i(s) E_i\rvert_{\gamma(s)} = \eta^i(s) E_i^j \frac{\partial}{\partial q^j}\Big\rvert_{\gamma(s)}
$$