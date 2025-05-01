---
title: "Differentials in Lie Theory"
date: 2025-01-13T12:46:04-05:00
showtoc: true
draft: false
---

I collect here some results about the differentials of the $\exp$ and $\log$ maps of a Lie group. The reader must be familiar with how the <span class=accented>differential</span> (i.e., pushforward map) is defined on a general manifold for much of this to make any sense. I will also rely extensively on the interpretation of [tangent vectors as equivalence classes of curves](](/posts/vector-fields)); Wikipedia has an excellent [summary](https://en.wikipedia.org/wiki/Tangent_space#Definition_via_tangent_curves) of this, as does my blog (if I may say so myself).

Let $L_g$ refer to the left-multiplication operation: $L_g(h)=gh$ for $g,h\in G$. Given $X\in\mathfrak g$, $X^L_g\coloneqq dL_g(X)$ is the corresponding left-invariant vector field. For a matrix Lie group (i.e., where $g$ is identified with some finite-dimensional matrix representation of it), $X^L_g=g X$, which makes sense because we have an external algebraic structure (namely, the multiplication of $n\times n$ matrices, which has the structure of a [unital associative algebra](https://en.wikipedia.org/wiki/Associative_algebra)) that lets us multiply group elements with Lie algebra elements. This rather convenient structure does not exist for a general Lie group. I will assume that the maps $\exp: U \rightarrow V$<!-- (surjective if the group is connected, injective when $G=\mathbb R^n$) -->
and $\log:V\rightarrow U$ are inverses of each other, where $U\subseteq \mathfrak g$ is a neighborhood of $0$ and $V\subseteq G$ is a neighborhood of $e$.

---

## 🀲 Differential of $\exp$

Suppose $\exp(X)$ is a point on $G$. The differential of $\exp$ provides an answer to the following question: what happens when $X$ is perturbed in the direction $Y \in T_{X}\mathfrak g$? The result, referred to as the *pushforward* of $Y$ under $\exp$, lies in $T_{\exp(X)} G$. It is a linear map between vector spaces: 

<p>
\[
    d\exp_X: T_{X}\mathfrak g \rightarrow T_{\exp X} G.
\]
</p>

Since $\mathfrak g$ is a vector space, we can identify $T_X\mathfrak g$ with $\mathfrak g$. Using the map $dL_{{\exp(X)}^{-1}}=dL_{{\exp(X)}}^{-1}$, we can identity $T_{\exp X} G$ with $T_e G$, which is also just $\mathfrak g$. A pedagogical nightmare ensues.

Let $\gamma(t)$ be a curve on $\mathfrak g$. We use the notation $[\gamma]$ to refer to the [equivalence class](https://en.wikipedia.org/wiki/Equivalence_class) of all the curves[^jet] that pass through $\gamma(0)$ with the velocity $\dot \gamma(0)$.[^gamma] We say that $\gamma$ is a <span class=accented>representative</span> of the class $[\gamma]$.
If $\gamma$ is chosen such that $\gamma(0)=X\in\mathfrak g$ and $\dot \gamma(0)=Y \in T_X\mathfrak g$, then $[\gamma]$ is completely characterized by $Y$ and vice versa; therefore, we can write $[\gamma]=Y$. 
The image of $\gamma$ under $\exp$, which is <span>$\exp\circ \gamma(t)$</span>, is a curve on $G$ as well as a representative of $d\exp_X(Y)$. That is,
$$d\exp_X(Y)=[\hspace{2pt}\exp\circ \hspace{1pt}\gamma\hspace{2pt}]$$

[^gamma]: Here, $\dot \gamma(0)$ refers to the pushforward of $\frac{\partial}{\partial t}\big\vert_{t=0}$ under $\gamma$.

[^jet]: This is also what's called a $1$-[jet](https://en.wikipedia.org/wiki/Jet_(mathematics)#Jets_of_functions_from_the_real_line_to_a_manifold). This notion of an 'equivalence class of curves' generalizes in annoying ways.

<!-- <aside class=aside-right>
</aside> -->

 is some vector in $T_{\exp(X)} G$. But which vector? 

<!-- In what follows, one can also read '$[\,\cdot\,]$' as "to the first order in $t$", resting assured that there is a precise meaning\footnote{$\ldots$either by way of *jets*, or by considering the actions of tangent vectors on functions.} for what this means. -->

<!-- Let's simply write $Y=[\gamma]$, then $d\exp_X(Y)=[\exp\circ \gamma]$. -->
The key to making these identifications concrete is to notice that we can choose *any* $\gamma$ satisfying $\gamma(0)=X$ and $\dot {\gamma}(0)=Y$.
**Any** such $\gamma$ is a representative of $Y$.
So, we might as well choose a $\gamma$ that is convenient to write down; let's make the choice, $\gamma(t) \coloneqq X+tY$. In this case, $\exp \circ\hspace{2pt} \gamma(t)=\exp(X+tY)$ is a curve on $G$ passing through $\exp(X)$, and it is a representative of $d\exp_X(Y)$. There's two different ways of writing down the equivalence class of $d\exp_X(Y)$:

$$
d\exp_X(Y) =\big[\exp(X+tY)\big]=\big[\exp(X)\exp(t\hspace{2pt}\square)\big]
$$

where the box is a Lie algebra element: $\square \in \mathfrak g$. There must be a value of $\square$ for which these are indeed the same equivalence class. The value of $\square$ can therefore be used to <u>describe</u> the quantity $d\exp_X(Y)$. Hence, we define the *Jacobian* of $\exp$ at $X$ as the linear map

<p>
\[
\begin{align*}
\Psi_X:\mathfrak g &\rightarrow \mathfrak g\\
Y &\mapsto \square
\end{align*}
\]
</p>

In conclusion, the differential of $\exp$ takes two objects, the point $X$ and the direction $Y$, and defines the object $\square$. Here, $\square$ represents the direction and extent to which $\exp(X)$ is perturbed when we nudge $X$ in the direction of $Y$. On <span class=accented>matrix Lie groups</span>, $\Psi_X$ is defined by

<p>
\[
\Psi_X(Y) =\square =\exp(X)^{-1}\frac{d}{dt}\exp(X+tY)\Big|_{t=0},
\]
</p>

and we write $d\exp_X(Y)=\exp(X)\Psi_X(Y)$.

---

## 🀳 Differential of $\log$

By the same arguments as above,

$$
d\log_g: T_g G \rightarrow T_{\log(g)}\mathfrak g.
$$

Since $T_g G\cong \mathfrak g$ and $T_{\log(g)}\mathfrak g\cong \mathfrak g$, we should once again expect a formula that goes from $\mathfrak g$ to $\mathfrak g$.
It proves to be convenient to work entirely with $\mathfrak g$-elements and write $\exp(X)$ in place of $g$.

Let $\gamma \coloneqq \exp(X) \exp(tY)$ by a curve passing through $\exp(X)$ with the velocity $Y$. We have,

<p>
\[
\begin{align*}
d\log_{\exp(X)}(Y)&=\big[\hspace{1pt}\log\mathrel\circ\gamma\hspace{1pt}(t)\hspace{1pt}\big]\\&=\big[\hspace{1pt}\log\big(\exp(X)\exp(tY)\big)\hspace{1pt}\big].
\end{align*}
\]
</p>

As before, we have an alternative way of writing down the equivalence class:

$$
\big[\hspace{1pt}\log\big(\exp(X)\exp(tY)\big)\hspace{1pt}\big]= \big[\hspace{1pt}X + t\hspace{1pt}\square\hspace{1pt}\big].
$$

Thus, the differential of $\log$ takes two objects, $X$ (alternatively, $g\coloneqq \exp(X)$) and $Y$, and its output is characterized by $\square$. Here, $\square$ is the direction in which $\log(g)$ is perturbed when we perturb its argument $g$ in the direction $Y$. On <span class=accented>matrix Lie groups</span>, we can once again define the operator $\Psi^{-1}_{\exp(X)}:\mathfrak g \rightarrow \mathfrak g$ using derivatives of matrix-valued functions:

<p>
\[
\Psi^{-1}_{\exp(X)}(Y) = \frac{d}{dt}\log\big(\exp(X)\exp(tY)\big)\Big|_{t=0}.
\]
</p>

We write $d\log_{g}(gY)=\Psi^{-1}_{g}(Y)$. Alternatively, we can write $d\log\_{g}(V)=\Psi^{-1}\_{g}(g^{-1}V)$, where $V\in T\_{g} G$.

<aside class=aside-center>
Section 3.2 of Jean Gallier's book has the formula for $d\exp_X$, and the appendix of my paper "<i>Parameter Estimation on Homogeneous Spaces</i>" has $d\log_{\exp(X)}$ (which I denote there as $\Psi$... oh well).
</aside>

<!-- ### Sanity Checks -->
We should verify that $\Psi_{\exp(X)}^{-1}$ is indeed the inverse of $\Psi_X$. Of course, this should be true from what we know about differentials/pushforwards of (locally) smooth maps between manifolds, but can we see this algebraically?

<p>
\[
\begin{align*}
\small
&\Psi_X\left(\Psi_{\exp(X)}^{-1}(Y)\right)\\ &\quad  = 
\exp(X)^{-1}\frac{d}{ds}\exp\left(X+s\frac{d}{dt}\log\big(\exp(X)\exp(tY)\big)\Big|_{t=0}\right)\Big|_{s=0}\\
\small
&\quad   \overset{?}=Y,\\
\small
&\Psi_{\exp(X)}^{-1}\left(\Psi_X(Y)\right)
 \\&\quad  = 
\frac{d}{dt}\log\Big(\exp(X)\exp\Big(t
\exp(X)^{-1}\frac{d}{ds}\exp\left(X+sY\right)\Big|_{s=0}
\Big)\Big)\Big|_{t=0}\\
\small
&\quad  \overset{?}=Y.
\end{align*}
\]
</p>

I'm not sure how to proceed... In any case, such formidable calculations should not be needed to demonstrate a simple fact. The intrinsic versions of these results are trivial:

<p>
\[
d\log_{\exp(X)}\left(d\exp_X(Y)\right) = d(\log \circ \exp)_X(Y)=Y.
\]
</p>

<p>
\[
d\exp_{\log(g)}\left(d\log_g(V)\right) = d(\exp \circ \log)_g(V)=V.
\]
</p>

<!-- Writing this using Jacobians,

<p>
\[
\Psi^{-1}_{\exp(X)}(\left(\Psi_X(Y)\right) )
\]
</p> -->

---

## 🀴 Parametrization 

Another context in which differentials show up in Lie theory is in the context of *parametrizations* of $G$. While most of this discussion is a specialization of what happens on a general manifold, the Lie group case is special because we are especially interested in left-invariant quantities (e.g., left-invariant vector fields and volume forms).

Let $\varphi:C\rightarrow D$ be a parametrization of $D\subseteq G$ whose domain is $C\subseteq \mathbb R^n$, such that its inverse $\varphi^{-1}:D \rightarrow C$ exists (and therefore, is a smooth coordinate chart). A function $f:G\rightarrow \mathbb R$ can be *restricted* to $D$ to define $f|_D:D\rightarrow \mathbb R$; nevertheless, we will just write $f$ to refer to the restricted function. We can pull $f$ back under $\varphi$ to define $\bar f\coloneqq {\varphi}^\ast f=f\circ \varphi$, so that $\bar f(\mathbf x)=f(\varphi(\mathbf x))$. We can differentiate $\bar f$ using the usual rules of multivariable calculus. Let $\frac{\partial}{\partial x^i}$ be the $i^{th}$ [standard vector field](/posts/vector-fields) in $C$. As vector fields do, it will map $\bar f$ to another function:

<p>
\[
\frac{\partial}{\partial x^i}\big(\,\bar f\,\big):C \rightarrow \mathbb R.
\]
</p>

As far as differential calculus on manifolds go, the story pretty much ends here. However, on a Lie group we are interested in computing derivatives along the left-invariant vector fields (LIVFs). Letting $\lbrace E_i \rbrace_{i=1}^n$ be a basis for $\mathfrak g$, we can express its LIVFs using the parametrization:

<p>
\[
E_{i,g}^L = g E_i = {\overline E_i^j}(g)\frac{\partial}{\partial x^j}\Big|_{g}
\]
</p>

Here, $\frac{\partial}{\partial x^i}\big|_{\varphi(\mathbf x)}\coloneqq d \varphi\_{\mathbf x}\frac{\partial}{\partial x^i}\big|\_{\mathbf x}$ (by abuse of notation) is called the $i^{th}$ coordinate vector field, and $\overline E_i^j$ are smooth functions. But what are these functions? We need to set up a commutative diagram that shows us how the action of $E\_{i}^L$ on $f$ can be equated to the action of an $\mathbb R^n$-vector field on $\bar f$. 

Let $Z = \mathbf z^i E_i$, where $\mathbf z^i$ are real numbers (not functions!). Consider

<p>
\[
    \begin{align*}
Z^L_{\varphi(\mathbf x)} f &= \mathbf z^i E^L_{i,\varphi(\mathbf x)}f =\mathbf z^i\frac{d}{dt}f\left(\varphi(\mathbf x)\exp(tE_i)\right)\Big|_{t=0}\\
&= \mathbf z^i{\overline E_i^j}(\varphi(\mathbf x))\frac{\partial}{\partial x^j}\Big|_{\varphi(\mathbf x)}f\\
&= \mathbf z^i{\overline E_i^j}(\varphi(\mathbf x))\frac{\partial \bar f}{\partial x^j}(\mathbf x)
\end{align*}
\]
</p>

where the last equality follows from the definition of the pushforward. Let $f$ be the $k^{th}$ coordinate function, ${x}^k:D \rightarrow \mathbb R$ (that is, $x^k\coloneqq {\varphi^{-1}}^k$). Then, ${{\partial x}^k}/{\partial x^j}=\delta^k_j$ (with the usual identifications), and we get

<p>
\[
    \begin{align*}
 E^L_{i,\varphi(\mathbf x)}x^k 
&= {\overline E_i^k}(\varphi(\mathbf x)).
\end{align*}
\]
</p>


Hence,

<p>
\[
    \begin{align*}
[Z^Lf](g) &= \mathbf z^i [E_i^Lx^j](g)\frac{\partial \bar f}{\partial x^j}(\varphi^{-1}(g)).
\end{align*}
\]
</p>

We can write this in the <span class=accented>matrix-vector form</span> as

<p style="text-align: center">
<span class=boxed>
\[
    \begin{align*}
\nabla f_{g}^\top\mathbf z = \nabla {\bar f}^\top_{\varphi^{-1}(g)} M(g)\,\mathbf z
\end{align*}
\]
</span>
<p>

where

<p>
\[
\begin{align*}
\nabla \bar f &= \begin{bmatrix}\frac{\partial \bar f}{\partial x^1} \\ \vdots \\ \frac{\partial \bar f}{\partial x^n}\end{bmatrix}\quad\text{and}\quad
\nabla f &= \begin{bmatrix}E_1^Lf \\ \vdots \\ E_n^Lf\end{bmatrix},
\end{align*}
\]
</p>

so that $\nabla f\_{g}^\top \mathbf z=\[Z^L f\](g)$, and $M^i_j=E_j^Lx^i$.
What is the inverse of $M$? Let $J(\mathbf x) \coloneqq \left[M(\varphi{\footnotesize(\mathbf x)})\right]^{-1}$. It should satisfy[^indices]

[^indices]: Don't worry too much about which indices I place on top and which on the bottom. I just like the placement of the indices of a matrix to be consistent with those of its components.

<p>
\[
    \begin{align*}
M_j^i\, J^j_k\, &=  J^j_k [E^L_{j}x^i]\\&=  [{(J^j_k E_j)}^Lx^i]\\
&= \delta^i_k.
\end{align*}
\]
</p>

So, $J^j_k$ should be such that 

<p>
\[
(J^j_k(\mathbf x) E_j)^L_{\varphi(\mathbf x)} = \frac{\partial}{\partial x^k}\Big|_{\varphi(\mathbf x)}=d\varphi_{\mathbf x}\left(\frac{\partial}{\partial x^k}\Big|_{\mathbf x}\right).
\]
</p>

In the <span class=accented>matrix-vector form</span>, we can write

<p style="text-align: center">
<span class=boxed>
\[
\nabla {\bar f}_{\mathbf x}^\top\mathbf y  = \nabla f_{\varphi(\mathbf x)}^\top J(\mathbf x)\mathbf y.
\]
</span>
</p>

Thus, the question of whether one uses $M$ or $J$ in calculations depends on whether the *direction of differentiation* is specified in the Lie algebra basis, or in the standard basis of $C\subseteq \mathbb R^n$ (i.e., it depends on whether it is $\mathbf z$ or $\mathbf y$ that is specified).

We can recover an explicit formula for $J$ that is used in the work of Chirikjian.[^chirikjian] On a <span class=accented>matrix Lie group</span>, we can view $\varphi:\mathbb R^n\rightarrow \mathbb R^{m \times m}$ as a map between vector spaces. Letting $(\hspace{1pt}\cdot\hspace{1pt})^\vee:\mathfrak g\rightarrow \mathbb R^n$ be the map $Z \mapsto\mathbf z$, which Chirikjian calls the *vee* map, we have

[^chirikjian]: Note that Chirikjian writes $J$ as "$J_r$", although I prefer to think of $J$ as the *left* Jacobian due to the involvement of left-invariant vector fields. Nevertheless, our calculations agree with his.

<p>
\[
J(\mathbf x) = \begin{bmatrix}\big(\varphi (\mathbf x)^{-1}\frac{\partial \varphi}{\partial x^1}\big)^\vee & \big(\varphi (\mathbf x)^{-1}\frac{\partial \varphi}{\partial x^2}\big)^\vee  &\cdots & \big(\varphi (\mathbf x)^{-1}\frac{\partial \varphi}{\partial x^n}\big)^\vee \end{bmatrix}.
\]
</p>

and

<p>
\[
M(g) = \begin{bmatrix}E_1^L \varphi^{-1}(g) & E_2^L \varphi^{-1}(g) & \cdots & E_n^L \varphi^{-1}(g) \end{bmatrix}= J(\varphi^{-1}(g))^{-1}.
\]
</p>



<aside class=aside-center>
The map $\varphi:\mathbf x\mapsto\exp(\mathbf x^iE_i)$ is called the <i class=accented>exponential parametrization</i>, whose inverse is $\varphi^{-1}(g)=\log(g)^\vee$. In this case,
$$
\begin{align*}
J(\mathbf x)\mathbf y&=\left(\varphi(\mathbf x)^{-1}\left(\mathbf y^i\frac{\partial \varphi}{\partial x^i}\Big|_{\mathbf x}\right)\right)^\vee \\
&= \left(\varphi(\mathbf x)^{-1}\frac{d}{d t}\exp\big((\mathbf x^i + t \mathbf y^i) E_i\big)\Big|_{t=0}\right)^\vee \\
&=
\left(\varphi(\mathbf x)^{-1}\frac{d}{d t}\exp(X + tY)\Big|_{t=0}\right)^\vee
=\big(\Psi_X(Z)\big)^\vee,
\end{align*}
$$
where $X^\vee =\mathbf x$ and $Y^\vee =\mathbf y$. Hence, $J(\mathbf x)$ is nothing but the linear operator $\Psi_X$ expressed in a specific basis. Similarly, 
$$
\begin{align*}
M(g)\mathbf z&= \big[Z^L\log^\vee\big](g) \\
&= \left(\frac{d}{d t}\log\big(g\exp(tZ)\big)\Big|_{t=0}\right)^\vee \\
&=\big(\Psi^{-1}_g(Y)\big)^\vee.
\end{align*}
$$
</aside>

To put this in yet another way, $J(\mathbf x) \mathbf y$ expresses the vector $d\varphi_{\mathbf x}(\mathbf y)$ in the basis of LIVFs, $\lbrace E_{i,g}^L\rbrace_{i=1}^n$ at $g=\varphi (\mathbf x)$. Meanwhile, $M(g) \mathbf z$ expresses the LIVF $Z^L_g$ in the standard coordinate basis at $\varphi^{-1}(g)$.

---

## 🀵 Lengths and Volume

In this final chapter, let's look at how the Jacobians of a parametrization relate to the measurement of lengths and volumes on $G$. 
Assume that we have an inner product for $\mathfrak g$, defined via

<p>
\[
\langle{E_i},{E_j}\rangle= W_{ij}.
\]
</p>

This inner product defines a unique <span class=accented>left-invariant Riemannian metric</span> on $G$ (as explained in my previous posts), written as $W_{ij}\varepsilon^i \varepsilon^j$, where $\lbrace \varepsilon_{i}\rbrace_{i=1}^n$ is the coframe that is dual to the frame of LIVFs, $\lbrace E_{i}^L\rbrace_{i=1}^n$. We now move to a point $\mathbf x$ in the parameter space. There is presently no inner product for $T_{\mathbf x}C$, since we haven't chosen one. The key observation is that the Riemannian metric and volume form are both covariant tensor fields, so they can be pulled back (under $\varphi$) from $D$ to $C$. For instance, if $\langle \cdot , \cdot \rangle_{\mathbf x}$ is the pullback of the left-invariant Riemannian metric, then

<p>
\[
    \begin{align*}
\left\langle \frac{\partial}{\partial x^r},\frac{\partial}{\partial x^s} \right\rangle_{\mathbf x} 
&=
\varphi^\ast_{\mathbf x}[W_{ij}\varepsilon^i \varepsilon^j]\left(\frac{\partial}{\partial x^r},\frac{\partial}{\partial x^s}\right)\\
&=
W_{ij}\varepsilon^i \varepsilon^j\left(d\varphi_{\mathbf x}\frac{\partial}{\partial x^r},d\varphi_{\mathbf x}\frac{\partial}{\partial x^s}\right)\\
&=
W_{ij}J(\mathbf x)^i_rJ(\mathbf x)^j_s.
\end{align*}
\]
</p>

Hence, we have a weighted inner product at $\mathbf x$: 
$$\langle \mathbf y,\mathbf z \rangle_{\mathbf x}=\mathbf y^\top J(\mathbf x)^\top \mathbf W J(\mathbf x)\mathbf z,$$

and as $\mathbf x$ varies, this defines a Riemannian metric on $C$.
Unlike the left-invariant Riemannian metric on $D\subseteq G$, the coefficients (i.e., the metric tensor) of the pullback Riemannian metric on $C\subseteq\mathbb R^n$ are not constant. 

The choice of basis for $\mathfrak g$ defines a unique <span class=accented>density</span> on $G$, written as $$\omega=|\varepsilon^1\wedge\varepsilon^2\wedge\cdots\wedge \varepsilon^n|.$$ 
<!-- If we assume (for simplicity of presentation) that $W_{ij}=\delta_{ij}$, i.e., the basis $\lbrace E_{i}\rbrace_{i=1}^n$ is orthonormal, then $\omega$ is called the canonical Riemannian density. -->
This is an example of a <span class=accented>left Haar measure</span> for $G$, which is unique up to scaling. 
The absolute value is taken to make this a *density* rather than a volume form, saving us the trouble of worrying about orientation.

By a similar procedure, we can compute the pullback volume form on $C$. Let $\varphi^\ast\omega=\lambda(\mathbf x) dx^1\wedge\cdots\wedge dx^n$. Then,

<p>
\[
    \begin{align*}
\lambda(\mathbf x) &= \varphi^\ast\omega\left(\frac{\partial}{\partial x^1},\cdots, \frac{\partial}{\partial x^n}\right)\\
&= |\varepsilon^1\wedge\varepsilon^2\wedge\cdots\wedge \varepsilon^n|\left(d\varphi_{\mathbf x}\frac{\partial}{\partial x^1},\cdots, d\varphi_{\mathbf x}\frac{\partial}{\partial x^n}\right)\\
&= |\varepsilon^1\wedge\varepsilon^2\wedge\cdots\wedge \varepsilon^n|\left(\,J_1^iE_i^L,\,J_2^iE_i^L,\cdots,\, J_n^iE_i^L\,\right)\\
&= \left\lvert\det\left(\begin{bmatrix}
J_1^1 & J_2^1 & \cdots & J_n^1\\
J_1^2 & J_2^2 & \cdots & J_n^2\\
 \vdots& \vdots& &\vdots\\
J_1^n & J_2^n & \cdots & J_n^n\\
\end{bmatrix}\right)\right\rvert \\
&= |\det(\,J{\small (\mathbf x)}\,)|,
\end{align*}
\]
</p>

where we have omitted the argument $(\mathbf x)$ of $J_i^j(\mathbf x)$ for brevity. 
We can now integrate a function $f:D \rightarrow \mathbb R$ w.r.t. the Haar measure $\omega$, by pulling the integral back to the parameter space:

<p>
\[
    \begin{align*}
\int_{D\subseteq G} f \cdot \omega &= \int_{C\subseteq \mathbb R^n} \varphi^\ast f \cdot\varphi^\ast \omega \\&=  \int_{C\subseteq \mathbb R^n} \bar f \cdot |\det (J) |\cdot dx^1\wedge \cdots \wedge dx^n,
\end{align*}
\]
</p>

where I use $`\hspace{1pt}\cdot\hspace{1pt}'$ for clarity, to indicate the multiplication of a function with another function or $n$-form.
