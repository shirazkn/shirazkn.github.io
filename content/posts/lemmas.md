---
title: "Differentials in Lie Theory"
date: 2025-01-13T12:46:04-05:00
draft: true
---

I collect here some results about the differentials of the $\exp$ and $\log$ maps of a Lie group. The reader must be familiar with how the <span class=accented>differential</span> (i.e., pushforward map) is defined on a general manifold for much of this to make any sense. I will also rely extensively on the interpretation of [tangent vectors as equivalence classes of curves](](/posts/vector-fields)); Wikipedia has an excellent [summary](https://en.wikipedia.org/wiki/Tangent_space#Definition_via_tangent_curves) of this, as does my blog (if I may say so myself).

I am interested in the differentials of the maps $\exp: \mathfrak g \rightarrow G$<!-- (surjective if the group is connected, injective when $G=\mathbb R^n$) -->
and $\log:U\rightarrow \mathfrak g$, where $U\subseteq G$ is a neighborhood of $e$.
Let $L_g$ refer to the left-multiplication operation: $L_g(h)=gh$ for $g,h\in G$. Given $X\in\mathfrak g$, $X^L_g\coloneqq dL_g(X)$ is the corresponding left-invariant vector field. For a matrix Lie group (i.e., where $g$ is identified with some finite-dimensional matrix representation of it), $X^L_g=g X$, which makes sense because we have an external algebraic structure (namely, the multiplication of $n\times n$ matrices, which has the structure of an [associative unital algebra](https://en.wikipedia.org/wiki/Associative_algebra)) that lets us multiply group elements with Lie algebra elements. This rather convenient structure does not exist for a general Lie group.

### Differential of $\exp$

Suppose $\exp(X)$ is a point on $G$. The differential of $\exp$ provides an answer to the following question: what happens when $X$ is perturbed in the direction $Y \in T_{X}\mathfrak g$? The result, referred to as the *pushforward* of $Y$ under $\exp$, lies in $T_{\exp(X)} G$. That is, the differential is a linear map between vector spaces: 

<p>
\[
    d\exp_X: T_{X}\mathfrak g \rightarrow T_{\exp X} G.
\]
</p>

Since $\mathfrak g$ is a vector space, we can identify $T_X\mathfrak g$ with $\mathfrak g$. Similarly, we can identity $T_{\exp X} G$ with $T_e G$, which is also just $\mathfrak g$. A pedagogical nightmare ensues.

Let $\gamma(t)$ be a curve on $\mathfrak g$. We use the notation $[\gamma]$ to refer to the [equivalence class](https://en.wikipedia.org/wiki/Equivalence_class) of all the curves[^jet] that pass through $\gamma(0)$ with the velocity $\dot \gamma(0)$.[^gamma] We say that $\gamma$ is a <span class=accented>representative</span> of the class $[\gamma]$.
If $\gamma$ is chosen such that $\gamma(0)=X\in\mathfrak g$ and $\dot \gamma(0)=Y \in T_X\mathfrak g$, then $[\gamma]$ is completely characterized by $Y$ and vice versa; therefore, we can write $[\gamma]=Y$. The curve $\gamma$ is a representative of $Y$.


[^gamma]: Here, $\dot \gamma(0)$ refers to the pushforward of $\frac{\partial}{\partial t}\big\vert_{t=0}$ under $\gamma$.

The image of $\gamma$ under $\exp$, which is <span class=accented>$\exp\circ \gamma(t)$</span>, is a curve on $G$ which represents the pushforward of $Y$. That is,
$$d\exp_X(Y)=[\hspace{2pt}\exp\circ \hspace{1pt}\gamma\hspace{2pt}]$$

[^jet]: This is also what is called a $1$-[jet](https://en.wikipedia.org/wiki/Jet_(mathematics)#Jets_of_functions_from_the_real_line_to_a_manifold), and this notion of an 'equivalence class of curves' generalizes in annoying ways.

<!-- <aside class=aside-right>
</aside> -->

 is some vector in $T_{\exp(X)} G$. But which vector? 

<!-- In what follows, one can also read '$[\,\cdot\,]$' as "to the first order in $t$", resting assured that there is a precise meaning\footnote{$\ldots$either by way of *jets*, or by considering the actions of tangent vectors on functions.} for what this means. -->

<!-- Let's simply write $Y=[\gamma]$, then $d\exp_X(Y)=[\exp\circ \gamma]$. -->
The key to making these identifications concrete is to notice that we can choose *any* $\gamma$ satisfying $\gamma(0)=X$ and $\dot {\gamma}(0)=Y$.
**Any** such $\gamma$ is a representative of $Y$.
So, we might as well choose a $\gamma$ that is convenient to write down; let's make the choice, $\gamma(t) \coloneqq X+tY$. 

Now, $\exp \circ\hspace{2pt} \gamma(t)=\exp(X+tY)$ is a curve on $G$ passing through $\exp(X)$, and it is also a member of its equivalence class $[\exp(X+tY)]$.
But consider this alternative way of writing down the same equivalence class:

$$
\big[\exp(X+tY)\big]=\big[\exp(X)\exp(t\hspace{2pt}\square)\big]
$$

where the box is a Lie algebra element: $\square \in \mathfrak g$. There must be a value of $\square$ for which these are the same equivalence class. The value of $\square$ can therefore be used to <u>describe</u> the quantity $d\exp_X(Y)$:

$$
d\exp_X(Y)=\big[\exp(X+tY)\big]=\big[\exp(X)\exp(t\hspace{2pt}\square)\big].
$$

In conclusion, the differential of $\exp$ takes two objects, the point $X$ and the direction $Y$, and defines the object $\square$. Here, $\square$ represents the direction and extent to which $\exp(X)$ is perturbed when we nudge $X$ in the direction of $Y$. 

<aside class=aside-center>
In the case of matrix Lie groups, we write $d\exp_X(Y)=\exp(X)\square$, although the reader should now understand what this <i>really</i> means and how one might go about deriving the formula for $\square$.
Section 3.2 of Jean Gallier's book has the formula for $d\exp_X$, and the appendix of my paper "<i>Parameter Estimation on Homogeneous Spaces</i>" has $d\log_{\exp(X)}$.
</aside>

### Differential of $\log$

By the same arguments as above,

$$
d\log_g: T_g G \rightarrow T_{\log(g)}\mathfrak g.
$$

Since $T_g G\cong \mathfrak g$ and $T_{\log(g)}\mathfrak g\cong \mathfrak g$, we should once again expect a formula that goes from $\mathfrak g$ to $\mathfrak g$.
It proves to be convenient to work entirely with $\mathfrak g$-elements and write $\exp(X)$ in place of $g$.

Let $\gamma \coloneqq \exp(X) \exp(tY)$ by a curve passing through $\exp(X)$ with the velocity $Y$. We have,
$$d\log_{\exp(X)}(Y)=\big[\hspace{1pt}\log\mathrel\circ\gamma\hspace{1pt}(t)\hspace{1pt}\big]=\big[\hspace{1pt}\log\big(\exp(X)\exp(tY)\big)\hspace{1pt}\big]$$
One sees the Baker-Campbell-Hausdorff-Dynkin formula starting to appear. As before, we have an alternative way of writing down the equivalence class:

$$
\big[\hspace{1pt}\log\big(\exp(X)\exp(tY)\big)\hspace{1pt}\big]= \big[\hspace{1pt}X + t\hspace{1pt}\square\hspace{1pt}\big].
$$

Thus, the differential of $\log$ takes two objects, $g$ (alternatively, $X=\log(g)$) and $Y$, and its output is characterized by $\square$. Here, $\square$ is the direction in which $\log(g)$ is perturbed when we perturb its argument, $g$, in the direction $Y$.


### Differential of ...

In equation $(5)$ of [this paper](https://ieeexplore.ieee.org/abstract/document/6160965/?casa_token=8rtZEWBp7nMAAAAA:idFlMZen0lzqi1TWCQQFt84IAnVmg8OPZGlmEaX9B3hmjYjFcqWK6oukSe26xKXm8XtWOShZOg), the authors use the result that

<p>
\[
\textrm{grad}_x d^2(x,y) = -2 \log_x (y).
\]
</p>

This makes intuitive sense, and the proof of it goes through some variant of the Gauss lemma. An analogous result holds on Lie groups with the distance defined in a group-theoretic manner. The group-theoretic 'distance' isn't necessarily a distance that arises from a Riemannian metric (i.e., the geodesic distance), however, so we should try to prove it without passing through the Gauss lemma.

Let $f(g) = \lVert \log h^{-1} g \rVert_2 ^2$. We want to compute its gradient w.r.t. a left-invariant Riemannian metric on $G$, $\langle\cdot, \cdot \rangle$. 
Let $\tilde Z \in \mathfrak g$ with $Z_g \coloneqq d L_g (\tilde Z)$ denoting the corresponding left-invariant vector field (LIVF). Furthermore, let $\mathfrak{grad}f_g \coloneqq dL_{g^{-1}}\left(\textrm{grad}f_g\right)$ denote the trivialization of the gradient. 
The gradient of $f$ can then be characterized as:

<p>
\[
\begin{align*}
\langle \mathfrak{grad}f_\mu, \tilde Z \rangle = \langle dL_{\mu^{-1}}\left(\textrm{grad}f_\mu\right), \tilde Z \rangle = \langle \textrm{grad}f_{\mu}, \tilde Z \rangle = Zf(\mu).
\end{align*}
\]
</p>

which should hold for an arbitrary $\tilde Z$.
We further decompose this function as $f= f_1 \circ f_2$ ($f_1$ *after* $f_2$) where $f_1:\mathfrak g \rightarrow \mathbb R_{\geq 0}$ and $f_2:G \rightarrow \mathfrak g$ in the obvious way. This means that

<p>
\[
\begin{align*}
Zf(\mu) &= 