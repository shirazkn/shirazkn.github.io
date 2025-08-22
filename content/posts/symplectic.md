---
title: "Classical Mechanics on Manifolds"
date: 2024-12-09T14:45:16+05:30
draft: false
showtoc: true
---

Despite having encountered the Lagrangian and Hamiltonian formalisms of mechanics several times in a variety of engineering and physics settings, I had never been able to retain it in my memory. I had maintained a similar dissatisfaction with the many formulae of multivariable calculus, which only really ✨clicked✨ for me once I learned about the exterior derivative and the <a href=https://youtu.be/1lGM5DEdMaw?si%3Dk9NhFF7jNBcaEoGQ class=accented>generalized Stokes' theorem</a>. 

In this post, I would like to collect my thoughts on the differential geometric treatment of <span class=accented>Lagrangian</span> and <span class=accented>Hamiltonian mechanics</span>, which assume a very simple and memorable form once we introduce the language of [symplectic geometry](https://en.wikipedia.org/wiki/Symplectic_geometry). Of course, to have made our mathematical journey to this point, where we are able to say anything at all about symplectic geometry, was a not-so-simple task.

---

## Symplectic Forms

Let $(\mathcal M, g)$ be a Riemannian manifold and $p\in \mathcal M$ a point on it. Recall that $g_p$ is an inner product on $T_p\mathcal M$ that is also smooth as a function of $p$.
If we pick coordinates on some open set of $\mathcal M$, the Riemannian metric can be expressed in this coordinate frame using a symmetric positive definite matrix $\mathbf G=[g_{ij}]$, such that $g= g_{ij} dx^i dx^j$.[^1]
Since any matrix can be decomposed into a symmetric and a skew-symmetric part, one can wonder: what sort of mathematical structure might a (invertible) <span class=accented>skew-symmetric</span> matrix of coefficients correspond to? 
<!-- For starters, we observe that since skew-symmetric matrices are not invertible in odd dimensions, we need to restrict our attention to even-dimensional manifolds. -->

This line of investigation leads us to the notion of a <span class=accented>symplectic form</span> on $\mathcal M$. A symplectic form is a closed, non-degenerate, skew-symmetric $2$-form $\omega$ on $\mathcal M$. In a coordinate frame near $p$, it can be written as $\omega = \omega_{ij}\hspace{2pt} dx^i \wedge dx^j$.
The non-degeneracy condition says that the skew-symmetric matrix $\Omega \coloneqq [\omega^{ij}]$ should be invertible.
Interestingly, since the skew symmetric matrices are singular (i.e., rank deficient) in odd dimensions, symplectic forms only exist on even-dimensional manifolds. We will say more about symplectic forms after considering a specific type of an even-dimensional manifold, namely the cotangent bundle (i.e., the "momentum phase-space").

<!-- <aside class=aside-center> -->
[^1]: [Recall](/posts/lie-groups_calculus) that the notation "$dx^i dx^j$" implicitly refers to the symmetric $2$-tensor, $\frac{1}{2}(dx^i \otimes dx^j + dx^j \otimes dx^i)$. 
<!-- </aside> -->

----

## Hamiltonian Mechanics on $T^\ast\mathcal Q$

### Symplectic Structure

Let $\mathcal Q$ be a smooth $n$-dimensional manifold, which we may call the "configuration space". The tangent bundle $T\mathcal Q$ of $\mathcal Q$ contains points of the form $(q, \dot {q})$, whereas its cotangent bundle $T^\ast\mathcal Q$ contains points of the form $(q, p)$ such that $p(\dot {q}) \in \mathbb R$. In particular, $T^\ast\mathcal Q$ is even-dimensional since it has dimension $2n$. Either bundle comes with a projection map, $\pi: T^\ast\mathcal Q \to \mathcal Q$, which sends $(q, p)$ to $q$.
Now, we know that smooth maps can *pull back* differential forms, whereas they *push forward* vector fields. In this sense the cotangent bundle $T^\ast\mathcal Q$ is different from the tangent bundle $T\mathcal Q$; there is a very natural (i.e., not based on any arbitrary choices) construction waiting to be made on $T^\ast\mathcal Q$. The object we are about to conjure is called the <span class=accented>tautological $1$-form</span>[^3] on $T^\ast\mathcal Q$, denoted as $\tau$. Since we eventually want a $2$-form $\omega$ on $T^\ast\mathcal Q$, we will need to take the exterior derivative of $\tau$.
 

[^3]: The word <i>tautological</i> refers to "obvious" or self-evident truths. The tautological one-form takes its name because of the self-reference involved in its definition, i.e., the object $p$ shows up both in the subscript as well as in the definition of $\tau_{(q, p)}$. 

At any point $(q, p)$ on $T \mathcal Q^\ast$, we use $\pi$ to pull back the only linear form that we have available at hand, namely the form $p$ at $q$. Thus, we define $\tau_{(q, p)} = d\pi^\ast_{(q, p)}p$.
Note that $\tau_{(q, p)} $ will eat vectors in $T_{(q, p)}(T^\ast\mathcal Q)$ while $p$ ate vectors in $T_q \mathcal Q$, so this is a bonafide construction and not a mere renaming of objects. The symplectic form is defined as $\omega = -d \tau$; the negative sign is just by convention as far as I can tell!

Suppose we have a coordinate chart $(q^i)_{i=1}^n$ on $U\subseteq \mathcal Q$, so that $q^i:U\rightarrow \mathbb R$. Since any differential form on $U$ can be expressed as $p = p_i dq^i$, we can think of $(q^i, p_i)_{i=1}^n$ as being a coordinate chart on the $2n$-dimensional manifold $T^\ast\mathcal Q$. Accordingly, $(dq^i, dp_i)_{i=1}^n$ is a basis for one-forms on $T^\ast\mathcal Q$. 
It can be shown that the tautological $1$-form is 
$$\tau = p_i \hspace{1pt}dq^i + 0\hspace{1pt} dp_i = p_i \hspace{1pt}dq^i$$ 
in these coordinates[^4], so that the symplectic form $\omega$ becomes $\omega = - d\tau = dq^i \wedge dp_i$. Since it is an [exact form](https://en.wikipedia.org/wiki/Closed_and_exact_differential_forms), $\omega$ is *closed*: $d\omega = -d(d\tau)=0$. Letting $\Omega$ denote the matrix of coefficients corresponding to this coordinate description of $\omega$, and ordering the coordinates as $(q^1, \ldots, q^n, p_1, \ldots, p_n)$, we have 

<p>
\[
\begin{align*}
\Omega = \begin{bmatrix} 0 & \mathbf I \\ -\mathbf I & 0 \end{bmatrix},
\end{align*}
\]
<p>

where $\mathbf I$ is the $n\times n$ identity matrix. 

<aside class=aside-center> The important <a class=accented href=https://en.wikipedia.org/wiki/Darboux%27s_theorem#Darboux%27s_theorem_for_symplectic_manifolds>Darboux theorem</a> says that <i>any</i> symplectic form can be (locally) expressed as $dq^i \wedge dp_i$ for some choice of coordinates $(q^i,p_i)$. Note that an analogous statement does not hold true for Riemannian metrics! Only the Riemannian metrics of <a href=/posts/sphere class=accented>flat manifolds</a> admit coordinates such that the metric tensor becomes $\mathbf I$.<br>
</aside>

[^4]: This is easily verifying by feeding either side a tangent vector.
Also see *Mechanics and Symmetry* by Marsden & Ratiu or *Smooth Manifolds* by John M. Lee.

### Hamiltonian Vector Fields

So far we have not endowed $T^\ast\mathcal Q$ with a Riemannian structure, but only a symplectic structure. Recall that a Riemannian metric lets us turn functions on the manifold into vector fields by means of the *gradient* operation. The symplectic analog of a gradient is the <span class=accented>Hamiltonian vector field</span> associated with a function $H: T^\ast\mathcal Q \to \mathbb R$. Here, $H$ is called the <span class=accented>Hamiltonian</span>. While the gradient vector field describes the directions in which a function changes, the Hamiltonian vector field describes the directions in which it does not.


The Hamiltonian vector field $X_H$ is defined by the equation $$\omega(X_H,{}\cdot{}) = dH,$$ analogous to how a gradient is defined as $\langle \textrm{grad} f, {}\cdot{}\rangle = df$. Let $X_H = Z^i \frac{\partial}{\partial q^i} + Y^i \frac{\partial}{\partial p_i}.$ Then, the defining equation of $X_H$ is

<p>
\[
\begin{align*}
\begin{bmatrix} Z^i & Y^i \end{bmatrix} \begin{bmatrix} 0 & \mathbf I \\ -\mathbf I & 0 \end{bmatrix} = \begin{bmatrix} \frac{\partial H}{\partial q^i} & \frac{\partial H}{\partial p^i} \end{bmatrix},
\end{align*}
\]
</p>

and by inverting $\Omega$, we get

<p>
\[
\begin{align*}
\begin{bmatrix} Z^i & Y^i \end{bmatrix}  &= \begin{bmatrix} \frac{\partial H}{\partial q^i} & \frac{\partial H}{\partial p^i} \end{bmatrix} \begin{bmatrix} 0 & -\mathbf I \\ \mathbf I & 0 \end{bmatrix}\\
&= \begin{bmatrix} \frac{\partial H}{\partial p^i} & -\frac{\partial H}{\partial q^i} \end{bmatrix}.
\end{align*}
\]
</p>

The integral curves (i.e., trajectories) of $X_H$ are given by the solutions to the following system of differential equations:

<p>
\[
\begin{align*}
\frac{\partial q^i}{\partial t} = \frac{\partial H}{\partial p^i}, \quad \frac{\partial p^i}{\partial t} = -\frac{\partial H}{\partial q^i},
\end{align*}
\]
</p>

which are precisely Hamilton's equations of motion.

### The Theorem of Emmy Noether

Notice that $\mathcal L_{X_H} H = dH(X_H) $$ = \omega(X_H, X_H) = 0.$ Hence, the Hamiltonian $H$ does not change along an integral curve of its own Hamiltonian vector field $X_H$. It is also true that 

$$\mathcal L_{X_H} \omega = (d \circ i_{X_H})\hspace{1pt} \omega + (i_{X_H} \circ d)\hspace{1pt} \omega =0$$

where we used [Cartan's magic formula](https://en.wikipedia.org/wiki/Cartan_formula) for the first equality. The second term in the middle vanishes because $\omega$ is closed, and the first term vanishes because $i_{X_H} \omega = \omega(X_H,\hspace{1pt}\cdot\hspace{1pt}) = dH$ is closed. When the Lie derivative of the symplectic form along a given vector field vanishes, that vector field is said to be <span class=accented>symplectic</span>. A Hamiltonian vector field is symplectic.

More broadly, we say that $f \in C^\infty(T^\ast\mathcal Q)$ is a <span class=accented>conserved quantity</span> of the Hamiltonian system $(T^\ast Q, \omega, H)$ if $\mathcal L_{X_H} f = X_H(f) = 0$. A vector field $V$ is called an <span class=accented>infinitesimal symmetry</span> if both $\omega$ and $H$ are invariant under its flow. <a href=https://en.wikipedia.org/wiki/Noether%27s_theorem class=accented>Noether's theorem</a> then says that every conserved quantity $f$ is itself the Hamiltonian of an infinitesimal symmetry (i.e., $\omega$ and $H$ are invariant along the flow of $X_f$). The converse direction is true when the first de Rham cohomology group of $\mathcal Q$ is trivial (a remark that I will not elaborate upon today, but [this person](https://www.youtube.com/watch?v=2ptFnIj71SM) will); the converse direction says that each infinitesimal symmetry arises as the $X_f$ of some underlying conserved quantity $f$. Thus,

$$\text{Conserved Quantities} \longleftrightarrow \text{Infinitesimal Symmetries}$$

are in one-to-one correspondence (when $H_{\textrm{dR}}^1=0$). The [Poincaré lemma](https://en.wikipedia.org/wiki/Poincar%C3%A9_lemma) shows that both directions of Noether's theorem hold when $\mathcal Q$ is (diffeomorphic to) an open ball of $\mathbb R^n$. By the way, notice the symmetry between the roles of $H$ and $f$; we could have begun our investigation by considering $f$ to be the Hamiltonian and $H$ the conserved quantity.

### Poisson Structure 

$T^\ast \mathcal Q$ with its canonical symplectic form $\omega$ is an example of a <span class=accented>Poisson manifold</span>. That is, there is an $\mathbb R$-bilinear mapping from two $C^\infty(T^\ast \mathcal Q)$ functions to another; this mapping is called the <span class=accented>Poisson bracket</span> and is defined as follows:

$$
\lbrace f,g\rbrace \coloneqq \omega(X_f, X_g).
$$

It satisfies certain axioms, including versions of the Leibnitz rule and Jacobi identity. Recalling that $X_g= \frac{\partial g}{\partial q^i} \frac{\partial}{\partial q^i} - \frac{\partial g}{\partial p_i} \frac{\partial}{\partial p_i}$, we have (for the Poisson bracket inherited from the canonical symplectic structure of $T^\ast \mathcal Q$) 

<p>
\[
    \begin{align*}
\lbrace f, g \rbrace &= \omega(X_f, X_g) = X_g f\\
&= \frac{\partial g}{\partial q^i} \frac{\partial f}{\partial q^i} - \frac{\partial g}{\partial p_i} \frac{\partial f}{\partial p_i}
\end{align*}
\]
</p>
which nicely captures the asymmetry between $f$ and $g$ in $\lbrace f,g\rbrace$.
Notice that since $\lbrace f, H\rbrace=X_H f$, the evolution of $f$ under the flow of $X_H$ is given by the Poisson bracket too. Letting $\alpha\in T^\ast Q$,

<p>
\[
\begin{align*}
\left[\lbrace f, H\rbrace \circ \Psi_t\right](\alpha) &= X_H f \left(\Psi_t(\alpha)\right)\\
&=\frac{d}{ds}f\left(\Psi_s(\Psi_t(\alpha))\right)\vert_{s=0}=\frac{d}{ds}f\left(\Psi_s(\alpha))\right\vert_{s=t},
\end{align*}
\]
</p>

where $\Psi_t$ is the flow of $X_H$. Thus, a conserved quantity satisfies $\lbrace f, H\rbrace = 0$ and vice versa (Prop. 22.21, Lee ISM). 

Previously, we used the symplectic form to define the <span class=accented>Hamiltonian vector field of $H$</span>. However, we could consider a more general definition that only uses the Poisson structure: 
$X_H \coloneqq \lbrace \hspace{1pt}\cdot\hspace{1pt}, H \rbrace.$ Hence, in the case of a symplectic manifold, we have
$$
dH(X_f)= \omega(X_H,X_f)=\lbrace H,f \rbrace = -\lbrace f,H \rbrace =-df (X_H)=-X_H(f)
$$
where the first equality uses our earlier (symplectic) definition of $X_H$, verifying that everything has been defined consistently. 

<aside class=aside-center>
<b>Mnemonic</b>: 
<!-- There appears to be a confusing <i>asymmetry</i> between these definitions, so hopefully the following can serve as a mnemonic.  -->
In both, $\omega\left(\hspace{1pt}\cdot\hspace{1pt},\hspace{1pt}\cdot\hspace{1pt}\right)$ and $\lbrace\hspace{1pt}\cdot\hspace{1pt},\hspace{1pt}\cdot\hspace{1pt}\rbrace$, the argument on the left 'gets differentiated' whereas the argument on the right differentiates (i.e., turns into a vector field). A minus sign shows up precisely when we interchange the roles of these arguments. 
There appears to be a confusing <i>asymmetry</i> in the way we define the Hamiltonian vector field;
in the symplectic definition, $H$ is the object being differentiated, whereas in the Poisson algebraic definition, $H$ assumes the role of the differentiator.
</aside>

Thus, we see that what we *really* need is a Poisson structure, rather than a symplectic structure on a manifold (note that symplectic structure $\Rightarrow$ Poisson structure, but not vice versa). A Poisson manifold is a manifold $\mathcal M$ for whose space of smooth functions, $C^\infty(\mathcal M)$, we endow the structure of a [Poisson algebra](https://en.wikipedia.org/wiki/Poisson_algebra).

<aside class=aside-right>
A Poisson algebra is a vector space (e.g., $C^\infty(\mathcal M)$ with pointwise addition and scalar multiplication) with two <i>products</i>: $(i)$ a bilinear product (e.g., pointwise multiplication of $C^\infty(\mathcal M)$-functions) and $(ii)$ the Poisson bracket, $\lbrace\cdot,\cdot\rbrace$, satisfying certain axioms. In particular, we require that $C^\infty(\mathcal M)$ is a Lie algebra under $\lbrace\cdot,\cdot\rbrace$, and that $\lbrace\cdot,\cdot\rbrace$ satisfies a compatibility condition with the other product.
</aside>

Given a <span>general Poisson bracket</span> (i.e., one that is *not* defined in terms of a symplectic form), there may exist a function $f$ that makes $\lbrace \cdot, f\rbrace$ vanish on all the other functions. This is not allowed in the symplectic case by virtue of the non-degeneracy of $\omega$.
An $f$ that has this property is called a <span class=accented>Casimir function</span>. For instance, the total angular momentum is a Casimir function for the Hamiltonian system describing rigid body dynamics. Due to the details given above, Casimir functions are invariant along all Hamiltonian systems on $T^\ast Q$; the angular momentum must and will be conserved! Conversely, the flow of a Casimir function preserves other functions. For instance, the Hamiltonian flow of the angular momentum function is a rotation, signifying the invariance of physical phenomena to rotation of 3D space. 

In this setting, a proof of Noether's theorem is as follows: $\lbrace f, H \rbrace = X_H f = 0$ (i.e., $f$ is a conserved quantity) implies $\lbrace H, f \rbrace = X_f H = 0$ (i.e., $X_f$ is an infinitesimal symmetry). If the reader knows or learns more about de Rham cohomology, it will become clear why cohomology plays a role in proving one of the directions of the theorem (that is, the direction in which we start with an infinitesimal symmetry $X$).

### Momentum Maps

If a Lie group $G$ acts by diffeomorphisms on $\mathcal Q$, then its action can be lifted (canonically) into symplectomorphisms (the symplectic analog of isometries) on $T^\ast \mathcal Q$. We do this simply by considering the pullback map corresponding to the group action (see Chapter 6.3, Marsden \& Ratiu IM\&S).

Let $\Phi_g: T^\ast \mathcal Q \rightarrow T^\ast \mathcal Q$ be the (canonically lifted) group action on $T^\ast \mathcal Q$ and $z = (q, p)\in T^\ast \mathcal Q$ a point.
We let $\tilde \xi$ denote the vector field on $T^\ast \mathcal Q$ defined by
$$
\tilde \xi_{\hspace{1pt}z}= \frac{d}{dt}\Phi_{\exp(t\xi)}\left(z\right)\Big\vert_{t=0},
$$
which is sometimes referred to as the *infinitesimal generator* of $\Phi_{\exp(\xi)}$.
Since $\tilde\xi$ is symplectic, at least locally it arises from a Hamiltonian: $\tilde \xi = X_{J_{\xi}}$ for some function $J_{\xi}$.
The <span class=accented>momentum map</span> $\mathbf J: T^\ast \mathcal Q \rightarrow \mathfrak g^\ast$ is an object that lets us evaluate this Hamiltonian as a (linear) function of $\xi$. That is,

<p>
\[
\left[\mathbf J(z)\right](\xi) = J_{\xi}(z)
\]
</p>

by construction.
Thus, the momentum map generalizes the Hamiltonian to the case of vector fields that arise from group actions. The momentum map is not merely a Hamiltonian; rather, it encapsulates the entire family of Hamiltonians whose Hamiltonian vector fields are the infinitesimal generators. Using the definitions, we have
$$
 \omega(\tilde \xi, \cdot\ )=  \omega(X_{J_\xi}, \cdot\ )= dJ_\xi.
$$
For the <span class=accented>general Poisson manifold</span> (with or without an accompanying symplectic form), we have
$$
 \tilde \xi = X_{J_{\xi}} = \lbrace \ \cdot\ , J_{\xi}\rbrace.
$$

----

## Lagrangian Mechanics on $T\mathcal Q$

We have spent some time on the cotangent bundle, where Hamiltonian mechanics appears in a very natural way. For me, the attraction of the Lagrangian formalism is that the Lagrangian is very tangible; it comes from some sort of a variational calculus problem that we can write down. On the other hand, I have been told that $L=T - V$ is the Lagrangian. But where does $T - V$ come from, and how does this generalize to other (less classical) mechanical systems? This is not so clear to me.

Lagrangian mechanics is done on $T\mathcal Q$ (i.e. the "velocity phase-space"). As the Hamiltonian is a function $H:T^\ast \mathcal Q \rightarrow \mathbb R$,
the <span class=accented>Lagrangian</span> is a function $L:T\mathcal Q \rightarrow \mathbb R$. For instance, to minimize some property of a curve we would write down the objective function as

$$\underset{\gamma(\cdot)\hspace{1pt}\in\hspace{1pt}\mathcal C}{\textrm{minimize}}\ \int_{t_0}^{t_1} L\left(\gamma(t), \dot \gamma(t)\right)\hspace{1pt} dt$$

where $\mathcal C$ is some set of curves and the quantity $\dot \gamma(t)$ represents a tangent vector. Similar minimization problems can be set up to describe optimal trajectories and configurations of rigid bodies, fluids, surfaces (such as soap films and cloths), etc.[^s]

[^s]: For the optimization of surfaces embedded in $\mathbb R^3$, the objective function looks like $\int_{[0,1]^2} L\left(\gamma, \gamma_x, \gamma_y\right)\hspace{1pt} dx dy$ where $x$ and $y$ are two time-like variables that take values in the parameter space $[0,1]^2$. This suggests that the Lagrangian density is best thought of as a top-dimensional form on the parameter space that can be integrated. When the parameter space is one-dimensional (e.g., when a *trajectory* is parametrized by time or a *curve* by its arc length), we get something like $\int_{0}^1 L dt$.

### Symplectic Approach

The tool that lets us move from $T\mathcal Q$ to $T^\ast\mathcal Q$ (where we can apply the Hamiltonian formalism) is called the <span class=accented>fiber derivative</span>, which is also the same thing as the better-known <span class=accented>Legendre transform</span>. Since one might expect to pull the tautological and symplectic forms to $T\mathcal Q$, it is expected that the fiber derivative should be a map from $T\mathcal Q$ to $T^\ast\mathcal Q$. Indeed, the fiber derivative of $L$ is the map $\mathbb F L: T\mathcal Q \rightarrow T^\ast\mathcal Q$ defined in Marsden and Ratiu's book (and omitted here)[^6]. It gives us a tautological one-form $\tau^L$ and a $2$-form $\omega^L$ on $T\mathcal Q$. However, while the non-degeneracy of the symplectic form $\omega$ is guaranteed on $T^\ast\mathcal Q$, the pullback form $\omega^L$ on $T\mathcal Q$ may be degenerate! In the case of systems for which the pullback $2$-form $\omega^L \coloneqq \mathbb F L^\ast(\omega)$ is non-degenerate (and therefore[^5] a symplectic form), the Lagrangian and Hamiltonian formalisms are equivalent.
In coordinates, we have $\tau^L = \frac{\partial L}{\partial \dot q^i} dq^i$ and (by exterior differentiation)

$$\omega^L = \frac{\partial^2 L}{\partial \dot q^i \partial q^j} dq^i \wedge dq^j + \frac{\partial^2 L}{\partial \dot q^i \partial \dot q^j} dq^i \wedge d\dot q^j.$$
As shown in Marsden, there is a very straightforward condition for the non-degeneracy of $\omega^L$:
$$\text{rank}\left(\frac{\partial^2 L}{\partial \dot q^i \partial \dot q^j}\right) = n.$$

A <span class=accented>Lagrangian vector field</span> $Z$ is one such that $\Omega^L(Z, \cdot) = dE$, where $E$ is the <span class=accented>energy function</span> on $T\mathcal Q$ defined by $E(q, \dot q) = \dot q^i \frac{\partial L}{\partial \dot q^i} - L(q, \dot q)$.[^7] When $\Omega^L$ is degenerate, the Lagrangian vector field $Z$ is not unique (which is perhaps why we do not write it as "$Z_{E}$"). <!-- $Z$ is called a *second-order equation* if $d\pi_{(q, \dot q)}(Z_{(q, \dot q)}) = \dot q$. -->
The integral curves of $Z$ correspond to Lagrange's equations of motion (Sec. 7.3 of Marsden and Ratiu).

The downside of the above approach is that it still does not tell us where the functions $L$ or $H$ come from. It just says that, given an initial piece of datum (be it a Hamiltonian $H$ or a Lagrangian $L$), there is a very natural sequence of steps that lets us write down Hamilton's or Lagrange's equations of motion in coordinates. Actually, we also have everything we need to do this in a coordinate-free manner, for instance, on Lie groups where it makes more sense to work with invariant vector fields rather than some coordinate vector fields.

[^5]: $\omega^L$ is closed because the exterior derivative commutes with pullbacks (a property known as *naturality*). This also means that $\tau^L$ and $\omega^L$ have the same relationship to each other as $\tau$ and $\omega$ do.

[^6]: Maybe something I could mention here is that $\mathbb F L$ differentiates *within* fibers. Unlike the other types of derivatives we have for tensor fields on manifolds, the definition of $\mathbb F L$ exploits the vector space structure of the fibers. Remember that in order to differentiate *across* fibers we need a [connection](/posts/sphere).

[^7]: I'm not sure what the motivation for this definition is. The most I can say is that the first term is actually $\mathbb F L(q,\dot q)$ acting on $\dot q$ in a tautological manner. It is also in some sense the linearization of $L$. So, $E$ is like (the negative of) $L$ minus the linearization of $L$.


### Variational Approach

A connected subset of the real line $[a,b]\subseteq \mathbb R$ is called an *interval*. A *curve* or a *path* in $\mathcal Q$ is given by a smooth map $\gamma:[a,b]\rightarrow \mathcal Q$. The quantity 
$$\dot \gamma(s) \coloneqq d\gamma_s \left(\frac{\partial}{\partial t}\Big\vert_{t=s}\right)$$ 
can be thought of as the "velocity vector" corresponding to $\gamma(\cdot)$ at time $s$, i.e., the tangent vector along the curve $\gamma$ at $\gamma(s) \in \mathcal Q$. The space of all smooth curves is an infinite-dimensional manifold $\mathcal C$, whose tangent space at $\gamma$ (i.e., $T_{\gamma}\mathcal C$) is the space of all smooth vector fields along $\gamma$. To see this, notice that if $\gamma(\hspace{1pt}\cdot\hspace{1pt},\lambda)$ is a family of curves parameterized by $\lambda$ (i.e., a curve in curve-space), then the tangent to this curve at $\gamma(\hspace{1pt}\cdot\hspace{1pt},0)$ is $\frac{d}{d\lambda}\gamma(\hspace{1pt}\cdot\hspace{1pt},\lambda)\big\vert_{\lambda=0}$. This object needs to be fed an argument in $[a,b]$ before it produces an element of $T\mathcal Q$. Confusingly, many authors denote this object as $\delta \gamma$, referring to it as a <span class=accented>variation</span> of $\gamma$.

We can rewrite the minimization problem mentioned earlier as follows: let $L: T\mathcal Q \rightarrow \mathbb R$ be a Lagrangian. We let $\mathfrak S$ denote the <span class=accented>functional</span> (i.e., a function which acts on other functions) defined by
$$\mathfrak S[\gamma] = \int_a^b L(\gamma, \dot \gamma)\hspace{3pt} dt$$
<!-- where $\gamma^\ast(L)= L \circ \gamma$ is the pullback of $L$ under $\gamma$. -->
We want to find the curve in some appropriate submanifold of $\mathcal C$ that minimizes $\mathfrak S$, under the pretext that $L$ could represent things such as the length or potential energy of a $\gamma$-shaped object. Just like in the finite-dimensional case of optimization, we can find the local minima of this problem by setting the exterior derivative $d\mathfrak S_{\tilde{\gamma}}$ to $\mathbf 0$ and solving for $\tilde{\gamma}$. Note that this "$\mathbf 0$" is the origin of $T\mathcal C^\ast$, as opposed to the real number $0$.

Let $X:[a,b]\rightarrow T\mathcal Q$ be a vector field along $\tilde{\gamma}$. Since $X$ also represents an element of $T_{\tilde{\gamma}}\mathcal C$, the covector $d\mathfrak S_{\tilde{\gamma}}$ can eat it to produce a number, which we set to $0$:

<p>
\[
    [d\mathfrak S_{\tilde{\gamma}}](X) = \left[d\left(\int_a^b L(\gamma, \dot \gamma) \hspace{3pt} dt\right)\right] (X)=0.
\]
</p>

Let $\gamma(\hspace{1pt}\cdot\hspace{1pt},\lambda)$ be a representative "curve" corresponding to $X\in T_{\gamma}\mathcal C$, such that $\frac{d}{d\lambda}\gamma(\hspace{1pt}\cdot\hspace{1pt},\lambda)\big\vert_{\lambda=0} = X$ and $\gamma(\hspace{1pt}\cdot\hspace{1pt},0) = \tilde{\gamma}$. Also, 

<p>
\[
\begin{align*}
[d\mathfrak S_{\tilde{\gamma}}](X) = \frac{d}{d\lambda}\mathfrak S(\gamma(\cdot, \lambda), \dot\gamma(\cdot, \lambda))\Big\vert_{\lambda=0}.
\end{align*}
\]
</p>

Because the differential structure of $\mathcal Q$ does not interact whatsoever with the integral structure of $[a,b]$, we interchange the differentiation and integration as usual:

<p>
\[
\begin{align*}
[d\mathfrak S_{\tilde{\gamma}}](X) &= \frac{d}{d\lambda}\int_a^b L(\gamma(t, \lambda), \dot \gamma(t,\lambda)) \hspace{3pt} dt\ \Big\vert_{\lambda=0}\\
&= \int_a^b \frac{\partial L}{\partial \gamma^i}\frac{\partial }{\partial \lambda}\gamma^i(t,\lambda)\Big\vert_{\lambda=0}\\&\qquad + \frac{\partial L}{\partial \dot \gamma^i}\frac{\partial}{\partial \lambda}\dot \gamma^i(t,\lambda)\Big\vert_{\lambda=0}\hspace{3pt} dt,
\end{align*}
\]
</p>

where we have made some implicit (but hopefully, reasonable) identifications.
In particular, we let $\gamma^i(t,\lambda)$ be the coordinate expression of $\gamma(t,\lambda)$, and write $X_{\tilde \gamma(t)}=X^i(t) \frac{\partial}{\partial q^i}\big\vert_{\tilde\gamma(t)}$.
We have that $\frac{\partial }{\partial \lambda}\gamma^i(t,\lambda)\big\vert_{\lambda=0}=X^i(t)$ by virtue of $ \gamma(t,\lambda)$ being a representative of $X$. As for the second term, we use the fact that $\frac{\partial}{\partial \lambda}$ and $\frac{\partial}{\partial t}$ commute:

<p>
\[
\begin{align*}
[d\mathfrak S_{\tilde{\gamma}}](X) &= 
\int_a^b \frac{\partial L}{\partial \gamma^i}X^i(t) + \frac{\partial L}{\partial \dot \gamma^i}\frac{\partial}{\partial \lambda}\left(\frac{\partial}{\partial t} \gamma^i\right)\bigg\vert_{\lambda=0}(t) \hspace{3pt} dt \nonumber \\
&= 
\int_a^b \frac{\partial L}{\partial \gamma^i}X^i(t) + \frac{\partial L}{\partial \dot \gamma^i}\frac{\partial}{\partial t}\left(\frac{\partial}{\partial \lambda} \gamma^i\right)\bigg\vert_{\lambda=0}(t) \hspace{3pt} dt \nonumber \\
&= 
\int_a^b \frac{\partial L}{\partial \gamma^i}X^i(t) + \frac{\partial L}{\partial \dot \gamma^i}\frac{d X^i}{d t} (t) \hspace{3pt} dt
\end{align*}
\]
</p>

and then integrate (the second term) by parts:

<p>
\[
\begin{align*}
[d\mathfrak S_{\tilde{\gamma}}](X) 
&= 
\int_a^b \frac{\partial L}{\partial \gamma^i}X^i(t)\hspace{2pt}dt 
 + \frac{\partial L}{\partial \dot \gamma^i}X^i(t)\bigg\rvert_a^b \hspace{2pt} \nonumber\\
 &\quad 
 - \int_a^b \frac{d}{dt}\left(\frac{\partial L}{\partial \dot \gamma^i}\right)X^i(t) \hspace{3pt} dt.
\end{align*}
\]
</p>

If we hold the endpoints fixed, i.e., $\gamma(a,\hspace{1pt}\cdot\hspace{1pt})$ and $\gamma(b,\hspace{1pt}\cdot\hspace{1pt})$ are each constant, then $X^i(a) = X^i(b) = 0$. In this case, the condition $[d\mathfrak S_{\tilde{\gamma}}]=0$ reduces to the Euler-Lagrange equations.[^noether]

[^noether]: Something that's missing from this article is an explanation of how Noether's theorem figures into the framework of Langrangian mechanics. I will revisit and update this post if I ever get into it.


----

<!-- Unlike in the above, I will only make broad strokes here, leaving the details to the excellent books of Marsden and Ratiu. -->

## Reduction

We can specialize the above to the case of a dynamical system evolving on a Lie group $G$. Since the vector bundles on $G$ can be trivialized (e.g., $T^\ast G \cong G \times \mathfrak g^\ast$), we leverage this additional structure to make the associated Hamiltonian and Lagrangian equations more "Cartesian" in flavor. This procedure, when applied to Hamiltonion mechanics on $T^\ast G$, is called <span class=accented>Lie-Poisson reduction</span>; when applied to Lagrangian mechanics/variational problems on $TG$, it is called <span class=accented>Euler-Poincaré reduction</span>. I get a bit into the latter in [a different post](/posts/ep). As for the former, it is explained quite well by Marsden and Ratiu in Chapter 13 of "Introduction to Mechanics and Symmetry". 

---

## Appendix

The last thing I offer in this post is an overview of the notation used in Marsden and Ratiu's books. This is as much addressed to readers (if any) of my blog as it is to my future self -- I often find myself struggling to recall how any of these differential operators are defined. That M&amp;R's notation is so different from the one I'm used to (which is the notation of John M. Lee's books) does not help.

### The Many Derivatives of Marsden \& Ratiu

**Maps between Normed Vector Spaces:** Let $f:U\subseteq \mathbf E \rightarrow \mathbf F$, where $\mathbf E$ and $\mathbf F$ are normed vector spaces, and $ x,  y\in U$. We define $\mathbf D f(  x)$ as the operator that satisfies

<p>
\[
\lim_{  y \rightarrow   x}\frac{\lVert 
f(y) - f(x) - \mathbf D f(  x) \cdot (  y -   x) 
\rVert_{\mathbf F}}{\lVert y -  x \rVert_{\mathbf E}} \rightarrow 0.
\]
</p>

<aside class=aside-right>
These are called the Fréchet and Gateaux derivatives, respectively. Fréchet differentiability is the stronger notion of the two, since in its definition one is probing all directions of approach (c.f., "$y \rightarrow x$") at once.
</aside>

Another way of writing this is that

<p>
\[
\mathbf D f(  x) \cdot e = \lim_{t\rightarrow 0} \frac{f( x + t e ) - f( x )}{t}
\]
</p>

$\forall e\in \mathbf E$. In coordinates, $\mathbf D f $ is precisely the Jacobian of $f$, $[\partial f^i/\partial x^j]$. 

**Maps between Manifolds**: In one squints at the above expressions, it appears that $\mathbf D f(x)$ is nothing but the <span class=accented>differential</span> of $f$ at $x$:

<p>
\[
df_{x}:T_{x}\mathbf E \rightarrow T_{f(x)}\mathbf F,
\]
</p>

except with the tangent spaces identified with their corresponding vector spaces, e.g., $T_{x}\mathbf E \cong \mathbf E$. Unlike the object $\mathbf D f$, the object $df$ generalizes beyond normed vector spaces; the domain and codomain of $f:\mathcal M \rightarrow \mathcal N$ are allowed to be arbitrary smooth manifolds. Instead of $df_x$, M&amp;R write "$T_x f$" on p. 124. 

**Exterior Derivative:** When the codomain of $f$ is $\mathbb R$, they write "$\mathbf d f(x)$" instead of $df_x$ or "$T_x f$". As much as I dislike the idea of introducing a special piece of notation for $\mathbb R$-valued maps, I think this is a reasonable piece of notation since in this case $\mathbf d f(x)$ is a bona fide one-form in $T_x^{\ast}\mathcal M$. After identifying $T_{f(x)} \mathbb R$ with $\mathbb R$, the operator $\mathbf d$ is indeed the <span class=accented>exterior derivative</span> as the notation promises. Thank God!

<!-- Personally, I would just call this object the <span class=accented>Jacobian</span> of $f$. -->

<!-- The chain rule takes the form 

$$
\mathbf D(g\circ f)(  x)\cdot   e = \mathbf Dg(f(  x))\cdot (\mathbf Df(  x) \cdot   e),
$$

while the product rule of differentiation can be generalized as follows; if $f_i: \mathbf E \rightarrow \mathbf F_i$ and $B:\mathbf F_1 \times \mathbf F_2 \rightarrow \mathbf G$ is a bilinear function, then 

$$
\mathbf D(B(f_1, f_2))(  u)\cdot   e = B(\mathbf Df_1(  u)\cdot   e, f_2(  u)) + B(f_1(  u), \mathbf D f_2(  u)\cdot   e).
$$
 -->


<!--
Higher-order derivatives are given by 
<p>
\[
    \mathbf D^2f(u)\cdot(v,w)=\mathbf D\left[\mathbf Df (\cdot) \cdot w\right](u)\cdot v
    \]
    </p> -->


<!-- ### The Functional Derivative -->

**[Functional Derivative](https://web.archive.org/web/20170217025324/https://www2.ee.washington.edu/techsite/papers/documents/UWEETR-2008-0001.pdf)**: This is yet another one of those unfortunately named (and notated) objects that in my opinion could simply be called the <span class=accented>differential</span>. Given $f:\mathbf E \rightarrow \mathbb R$, let ${\delta f}/{\delta x} \coloneqq df_{x}$ be the unique element of $T_x^*\mathbf E \cong \mathbf E^\ast$ that satisfies
$$
\mathbf D f(x)\cdot e =  \frac{\delta f}{\delta x} (e)
$$
Again, I would have just written $df_x(e)$ for this, with $e$ interpreted as an element of $T_x \mathbf E$ as much as a vector in $\mathbf E$. Unfortunately, M&amp;R and other physicists write "$\delta x$" instead of $e$, which complicates things further.

<!-- <aside class=aside-right> It has always baffled me as to what role $\delta$ plays here... if there is some reason unbeknownst to me why one should write "$\delta x$", then please leave a comment! I want to know!
</aside> -->

**Gradient**: The notion of a functional derivative can be generalized: consider a (nondegenerate) pairing $\langle\cdot, \cdot\rangle:\mathbf E \times \mathbf F \rightarrow \mathbb R$ between two different vector spaces, $\mathbf E$ and $\mathbf F$. For instance, the "duality pairing" between $\mathbf E$ and $\mathbf E^\ast$ is given by $\langle e, \varphi \rangle = \varphi(e)$. One defines the (generalized) <class span=accented>gradient</span> of $f:\mathbf E\rightarrow \mathbb R$ at $x\in\mathbf E$ as the unique element $\textup f\in \mathbf F$ such that $df_x(e)=\langle e, \textup f\hspace{1pt}\rangle$.
Thus, the functional derivative is a sort of "gradient" under the duality pairing, while the colloquial notion of a "gradient vector" uses the inner product pairing of $\mathbf E$ with itself.


**Gradient (of a Functional)**: Let $(\mathcal M, \mu)$ be a measure space and $\mathbf E = C^0(\mathcal S)$ the vector space of continuous real-valued functions on $S\subseteq \mathcal M$, where $\mathcal S$ satisfies all of the assumptions that will be needed of it. A point $\varphi \in \mathbf E$ is a function of the form $\varphi:\mathcal S \rightarrow \mathbb R$. Let $f: \mathbf E \rightarrow \mathbb R$ be a <span class=accented>functional</span>, i.e., a meta function that eats lesser functions and spits out real numbers, so that $f(\varphi) \in \mathbb R$. We can let $\mathbf E = \mathbf F$ and consider the usual $L^2$ inner product on $\mathbf E$ when defining the gradient. Since $T_{\varphi} \mathbf E \cong \mathbf E$, the gradient of $f$ at $\varphi$,
$$\frac{\delta f}{\delta \varphi}: \mathcal S \rightarrow \mathbb R,$$
is itself viewed as (a vector in $\mathbf E$, and therefore) a function.

We see that the functional derivative takes the form

$$
\mathbf D f(\varphi)\cdot e = \int_{\mathcal S} \frac{\delta f}{\delta x}{\small(}s{\small)}\ e{\small(}s{\small)} \ d\mu{\small(}s{\small)}.
$$

Thus, the Euler-Lagrange equations are simply the conditions under which the gradient (i.e., functional derivative) of $f$ vanishes, as it must at critical points. 

