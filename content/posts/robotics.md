---
title: "On the Monogram Notation"
date: 2025-11-13T21:23:17-05:00
draft: true
showtoc: true
tags: ["robotics", "lie-groups", "geometry"]
---

I've been going through Russ Tedrake's [notes](https://manipulation.csail.mit.edu/pick.html) on robotics, which got me thinking about their so-called <span class=accented>monogram notation</span>. Basically, this is the notation that represents an $SE(3)$ transformation as $^aX^b$ — more on that shortly. There is a recent [review paper](https://arxiv.org/html/2405.07351v1) that points to several variations on this notation, and my postdoc advisor [Gregory Chirikjian](https://en.wikipedia.org/wiki/Gregory_S._Chirikjian) wrote a [paper](https://trumpf.id.au/pubs/Chirikjian_Mahony_Ruan_Trumpf_JMR2017.pdf?utm_source=chatgpt.com) on it as well. Tedrake's monogram notation looks very elegant until you get to spatial velocities, at which point strange artifacts such as the "cross product" will appear.
$\newcommand{\mf}[1]{\mathbf{#1}}$ $\newcommand{\mono}[4]{ { ^{#2} #1 ^{#3} _{#4} } }$

This got me thinking about what the theory hiding behind this notation looks like. What is the connection between the monogram notation and the abstract Lie groups that I have taken so much pain to study on this blog? The result of this deliberation was a new notation for spatial velocities that bridges the gap between abstract Lie groups and their applications.

## <span class=tertiary>Chapter 1.</span> The Frame Bundle

First, let's think about the space in which frames live. Given a point $\mf p\in \mathbb R^3$, a <span class=accented>frame</span> $f$ at $\mf p$ is an ordered set of $3$ linearly independent vectors, $(\mf f_1, \mf f_2, \mf f_3)$, along with the base point $\mf p^f$.
The frame is visualized as arrows starting at $\mf p$ and facing outwards.[^orientation] The collection of all frames of $\mathbb R^3$ makes up the frame bundle, $\mathrm F\mathbb R^3$. 
There is a map $\pi:\mathrm F\mathbb R^3\rightarrow \mathbb R^3$ that maps the frame $f$ to its base point $\mf p^f$, giving us a [fiber bundle](/posts/bundles/#-the-frame-bundle) structure.

[^orientation]: It turns out that such a frame can have one of two parities — it can either be *positively* or *negatively* oriented. Our usual choice of the $\mathrm{xyz}$ axes is positively oriented, so you can use that fact to come up with your own "right-hand rule" for positive orientation.

The contents of the frame $f\in\mathrm F\mathbb R^3$ can be stacked into a matrix as follows: 
$$
f=\begin{bmatrix}
\mf f_1 & \mf f_2 & \mf f_3 & \mf p^f\\
0 & 0 & 0 & 1
\end{bmatrix}.
$$
Meanwhile, an element $(A, \mf t)$ of the semi-direct product group $G\coloneq GL(3)\ltimes\mathbb R^3$ can be written as

$$
(A, \mf t) = \begin{bmatrix}
A & \mf t\\
\mf 0 & 1
\end{bmatrix}.
$$
The group $G$ acts on the frame bundle $\mathrm F\mathbb R^3$ by matrix multiplication on the left:
$$
(A, \mf t)\cdot f = \begin{bmatrix}
A & \mf t\\
\mf 0 & 1
\end{bmatrix} \begin{bmatrix}
\mf f_1 & \mf f_2 & \mf f_3 & \mf p^f\\
0 & 0 & 0 & 1
\end{bmatrix} \eqcolon \begin{bmatrix}
\mf g_1 & \mf g_2 & \mf g_3 & \mf p^g\\
0 & 0 & 0 & 1
\end{bmatrix} = g
$$
so that $\mf g_i = A \mf f_i$ and $\mf p^g = A \mf p^f + \mf t$. The action of $G$ is transitive and free (it doesn't really matter what these words mean, but I have included a handy guide in the appendix). In particular, $SE(3)=SO(3)\ltimes \mathbb R^3$ is a subgroup of $G$ that acts on $\mathrm F\mathbb R^3$, and it leaves the subset $\mathrm O\mathbb R^3\subseteq \mathrm F\mathbb R^3$ of positively-oriented orthogonal frames invariant! We will later specialize our discussion to the action of $SE(3)$ on $\mathrm O\mathbb R^3$.

<aside class=aside-right>
The fact that $g={^fX^g} f$ might seem strange, but we will see that this is precisely the <a class=accented href=https://manipulation.csail.mit.edu/pick.html>monogram notation</a>. We just need to be careful about the fact that the action of ${^fX^g}$ on basis vectors is <i>opposite</i> to its action on the coefficients of vectors expressed w.r.t. that basis.
</aside>

Let ${^fX^g}\coloneq(A, \mf t)$ be the transformation in $G$. We write it as ${^fX^g}$ to indicate that it takes the frame $f$ to the frame $g$. Equivalently, ${^fX^g}$ is the frame $g$ as seen from $f$. Because the action is free and transitive, we can identify each transformation with an ordered pair of frames $(f,g)$, where $f$ is the "from" frame and $g$ is the "to" frame.

<p style="text-align: center">
<span class=boxed>
${^fX^g}$ is the transformation that takes frame $f$ to frame $g$<br> Equivalently, it is frame $g$ as seen from frame $f$
</span>
</p>

You may have noticed that the frames $f$ and $g$ themselves look like elements of $G$. This confusion between points on a homogeneous space and elements of the group acting on that space is one of the pitfalls that the monogram notation seeks to address.

## <span class=tertiary>Chapter 2.</span> Transformation Rules

In the last chapter, we implicitly assumed that there is a well-defined "<span class=accented>origin frame</span>", which we will call $e$. This is the frame that is described by the identity matrix, when concatenated into a matrix. For our purposes, we can assume that this is a frame that is stationary with respect to Earth 🌏, and located at a convenient location (perhaps the lower-left corner of my desk).

Let $f$ be the frame attached to the fan on my ceiling (which is currently stationary).
We can describe the vector that goes from $e$ to $f$ as $\mono{\mf p}{e}{f}{~}$. Expressing this vector in the basis of $f$, we have
$$
\mono{\mf p}{e}{f}{~} = \mono{\mf p}{e}{f}{\mf f_1} \mf f_1 + \mono{\mf p}{e}{f}{\mf f_2} \mf f_2 + \mono{\mf p}{e}{f}{\mf f_3} \mf f_3,
$$
whose coefficients we can represent as a vector:
$$
\mono{\mf p}{e}{f}{f}\coloneq\begin{bmatrix}
\mono{\mf p}{e}{f}{\mf f_1}\\
\mono{\mf p}{e}{f}{\mf f_2}\\
\mono{\mf p}{e}{f}{\mf f_3}
\end{bmatrix}.
$$
We could also represent $\mono{\mf p}{e}{f}{~}$ in the origin (i.e., Earth) frame:
$$
\begin{align}
\mono{\mf p}{e}{f}{~} &= \mono{\mf p}{e}{f}{\mf e_1} \mf e_1 + \mono{\mf p}{e}{f}{\mf e_2} \mf e_2 + \mono{\mf p}{e}{f}{\mf e_3} \mf e_3\\
&= \begin{bmatrix}
\mono{\mf p}{e}{f}{\mf e_1}\\
\mono{\mf p}{e}{f}{\mf e_2}\\
\mono{\mf p}{e}{f}{\mf e_3}
\end{bmatrix} \ \\
&\eqcolon \mono{\mf p}{e}{f}{e}.
\end{align}
$$
As in Tedrake's notes, if we omit a supercript/subscript, we mean the origin (or Earth) frame: $\mono{\mf p}{}{f}{}\coloneq\mono{\mf p}{e}{f}{e}$. 
This means that $\mono{\mf p}{}{}{f}$ is the zero vector, and $\mono{X}{}{}{f}$ the identity matrix!

Notice that $f$ has the same matrix as $\mono{X}{}{f}{}$. We can view $f$ both as a frame and as a transformation from $e$ to $f$. Similarly, $\mf p^f$ can be viewed both as a point in $\mathbb R^3$ and as the vector going from the origin to $\mf p^f$. 
The underlying reason is that, in order to describe to you which point (or frame) I am talking about, I need to first choose an origin (or Earth frame).[^dist] 

[^dist]: Abstractly speaking, a group has a distinguished point (the identity), while on a homogeneous space we need to <i>choose</i> a reference point. In the context of [my previous post](/posts/bundles), the Earth frame $e$ can be seen as a choice of a distinguished point in $\mathrm F\mathbb R^3$. It identifies $\mathrm F\mathbb R^3$ with $GL(3)\ltimes \mathbb R^3$. Similarly, we can identify $\mathrm O\mathbb R^3$ with $SE(3)$; given a frame $f\in\mathrm O\mathbb R^3$, we associate it to the $SE(3)$ transformation $\mono{X}~f~ = \mono{X}efe$. In other words, $\mathrm O\mathbb R^3$ is an $SE(3)$-torsor.

We have the following identities for frames $f,g,h,$ and $k$.
<p style="text-align: center">
<span class=boxed style="text-align: left">
<span class=secondary>(Vector Addition)</span> $\mono{\mf p}{f}{h}{k} = \mono{\mf p}{f}{g}{k} + \mono{\mf p}{g}{h}{k}$<br>
<span class=secondary>(Additive Inverse)</span> $\mono{\mf p}{f}{g}{k} = - \mono{\mf p}{g}{f}{k}$<br>
<span class=secondary>(Inverse Transformation)</span> $\mono{X}{f}{g}{} = (\mono{X}{g}{f}{})^{-1}$
</span>
</p>

Using these facts, we can derive the transformation rules for points. Let's relate how the frames $e$ and $f$ see the point $\mf p^g$:
$$
\begin{align}
\mono{\mf p}~g~ &= \mono{\mf p}~f~ + \mono{\mf p}fg e\\
&= \mono{\mf p}~f~ + \mono{\mf p}fg{\mf f_1}\mf f_1 + \mono{\mf p}fg{\mf f_2}\mf f_2 + \mono{\mf p}fg{\mf f_3}\mf f_3\\
&= \mono{\mf p}~f~ + \mono{A}~f~ \mono{\mf p}fg{f},
\end{align}
$$
$$
\text{or}\quad
\begin{bmatrix}
\mono{\mf p}e g e\\
1
\end{bmatrix}
= \mono{X}~f~ \begin{bmatrix}
\mono{\mf p}fg{f}\\
1
\end{bmatrix}
$$

where $\mono{X}~f~=(\mono{A}~f~, \mono{\mf p}~f~)$ and $\mono{A}~f~\in GL(3)$ is the matrix
$$
\mono{A}~f~ = \begin{bmatrix}
\mf f_1 & \mf f_2 & \mf f_3
\end{bmatrix}.
$$
What we wrote above is just the last column of the formula...

<p style="text-align: center">
<span class=boxed style="text-align: left">
<span class=secondary>(Composition)</span> $\mono{X}eg~ = \mono{X}ef~ \mono{X}fg~$
</span>
</p>

which generalizes to arbitrary frames.
While $\mono{X}ef~$ translates between how $e$ and $f$ each see the <span class=accented>frame</span> $g$, we may be interested in translating between how $e$ and $f$ see the <span class=accented>vector</span> going from $f$ to $g$, which is $\mono{\mf p}fg~=\mono{\mf p}~g~ - \mono{\mf p}~f~$. We already know what this looks like:
$$
\mono{\mf p}fge = \mono{A}ef~\mono{\mf p}fgf.
$$

When $e$ and $f$ are both positively-oriented orthogonal frames, $\mono{A}ef~$ is an orthogonal matrix, so we will write it as $\mono{R}ef~$ instead:

<p style="text-align: center">
<span class=boxed style="text-align: left">
<span class=secondary>(Rotation-of-Basis)</span> $\mono{\mf p}fge = \mono{R}ef~\mono{\mf p}fgf$
</span>
</p>

In this case, $\mono{X}ef~=(\mono{R}ef~, \mono{\mf p}eff)\in SE(3)$. These formulae hold if we replace $e$ with $h$; I just used $e$ to simplify the presentation.

## <span class=tertiary>Chapter 3.</span> Velocities
Suppose we have curves $f :\mathbb R\rightarrow \mathrm F\mathbb R^3$ and $g :\mathbb R\rightarrow \mathrm F\mathbb R^3$, such that $f(t)$ and $g(t)$ are moving w.r.t. the origin frame $e$. Our task it to describe their velocities at time $t$. 

*<span class=tertiary>Setting up the notation.</span>* I introduce the following notation for derivatives:

$$
\begin{align}
(\mono{X}{f}{g}~)' &\coloneq \frac{d}{d\tau}{\mono{X}{f(t+\tau)}{g(t+\tau)}~}\Big\vert_{\tau=0}\\
\mono{X}{f}{g'}~ &\coloneq \frac{d}{d\tau}{\mono{X}{f(t)}{g(t+\tau)}~}\Big\vert_{\tau=0}\\
\mono{X}{f'}{g}~ &\coloneq \frac{d}{d\tau}{\mono{X}{f(t+\tau)}{g(t)}~}\Big\vert_{\tau=0}
\end{align}
$$

which means that $(\mono{X}gg~)' = \mf 0$, and so on. Each of these quantities is the component-wise derivative of a time-dependent matrix. By differentiating the identity
$$
\mono{X}{f(t)}{g(t+\tau)}~ \mono{X}{g(t+\tau)}{f(t)}~ = \mf I,
$$

we get $\mono{X}f{g'}~=-\mono{X}fg~\,\mono{X}{g'}f~\,\mono{X}fg~$. In particular, $\mono{X}g{g'}~=-\mono{X}{g'}g~$.

Basic physics tells us that, in order to even define what *velocity* is, we need to decide which frame we consider to be *stationary*. We will write $\mono{\Lambda}fgk$ to denote the velocity of $g$ as seen from $k$, with $f$ considered to be the stationary frame. It is of the form
$$
\mono{\Lambda}fgk = \begin{bmatrix}
\mono{\Omega}fgk & \mono{\mf v}fgk\\
\mf 0 & 0
\end{bmatrix}\in \mathfrak{se}(3),
$$
where $\mono{\Omega}fgk\in\mathfrak{so}(3)$ is a $3\times 3$ skew-symmetric matrix. We can also call $f$ the *reference* frame, or the *observer* frame.

*<span class=tertiary>Using the notation.</span>*
We denote the velocity of $g$ as seen from itself, with $e$ considered as the stationary frame, as

<p style="text-align: center">
<span class=boxed style="text-align: left">
<span class=secondary>(Left-Invariant Velocity)</span>
$
\mono{\Lambda}egg\coloneq \mono{X}g{g'}~
$
</span>
</p>

It follows that $\mono{X}{g'}g~ = - \mono{\Lambda}~gg$. Similar to how left-invariant vector fields work on abstract Lie groups, we have
$$
\begin{align}
\mono{X}e{g'}~=\frac{d}{d\tau}{\mono{X}{e}{g(t)}~ \mono{X}{g(t)}{g(t+\tau)}~}\Big\vert_{\tau=0} = \mono{X}{e}{g}~ \mono{\Lambda}~gg.
\end{align}
$$

<!-- $$
\begin{align}
\frac{d}{d\tau}{\mono{X}{g(t+\tau)}f~}\Big\vert_{\tau=0}=\frac{d}{d\tau}{\mono{X}{g(t+\tau)}{g(t)}~ \mono{X}{g(t)}f~}\Big\vert_{\tau=0} = \mono{\Lambda}{\dot g}~~ \mono{X}{g}f~
\end{align}
$$ -->

Thus, $\mono{\Lambda}~gg=(\mono{X}eg~)^{-1}\,\mono{X}e{g'}~$ is indeed the <span class=accented>left-invariant velocity</span> of $g$. What is then the right-invariant velocity? It is the velocity of $g$ as seen from $e$, with $e$ considered the stationary frame:

<p style="text-align: center">
<span class=boxed style="text-align: left">
<span class=secondary>(Right-Invariant Velocity)</span>
$
\mono{\Lambda}ege\coloneq  \mono{X}{e}{g}~ \mono{\Lambda}{}gg \,\mono{X}ge~=\mathrm{Ad}_{\mono{X}{e}{g}{}}(\mono{\Lambda}{}gg)
$
</span>
</p>

The nice symmetric notation in the middle helps us remember this formula, although I like the $\mathrm{Ad}$ notation since it makes the transformation rules look like those of vectors and frames. Recall the definition of the [adjoint representation](https://en.wikipedia.org/wiki/Adjoint_representation), $\mathrm{Ad}_X:\mathfrak{se}(3)\rightarrow\mathfrak{se}(3)$ for each $X\in SE(3)$. 

<aside class=aside-center>
The left-invariant velocity is the velocity of $g$ as seen from $g$, while the right-invariant velocity is the velocity of $g$ as seen from $e$. I have been cheeky in choosing $e$ and $g$ as the notation for these frames, since I want $e$ to remind you of the identity element of $SE(3)$! 
</aside>

Here is the big payoff of this notation. Velocities add like vectors, as long as they are expressed in the same frame:
<p style="text-align: center">
<span class=boxed style="text-align: left">
<span class=secondary>(Addition of Velocities)</span>
$
\mono{\Lambda}fhk = \mono{\Lambda}fgk + \mono{\Lambda}ghk
$
</span>
</p>

You are encouraged to prove this! As a hint, notice that it is sufficient to prove this for the case of $k=f$.

## <span class=tertiary>Chapter 4.</span> Hat & Vee Maps

For an introduction to the hat and vee maps, see the books by Chirikjian or Barfoot, or Appendix A of my [preprint](https://arxiv.org/abs/2508.12030). Basically, $\mathfrak{so}(3)$ has a particular choice of basis which lets us map skew-symmetric matrices to vectors in $\mathbb R^3$, as $$

----

## <span class=tertiary>Appendix.</span> Group Actions

An action of $G$ on $X$ is said to be...
- <span class=accented>effective</span> (or <span class=accented>faithful</span>) if $g\cdot x=x$ for all $x \in X$ implies $g=e$.
    Equivalently, the mapping $G\mapsto \textrm{Aut}(X)$ is injective.
    <p class=equation-like>
                <span class="print tertiary"> 
                “Everyone (in $G$) is doing something <i>somewhere</i> (in $X$)"
                </span>
        </p>
- <span class=accented>free</span> if $g\cdot x=x$ for some $x$ already implies that $g=e$.
    Given an element $g\in G\backslash\lbrace e\rbrace$, its action has no fixed points (is fixed-point free!)
    <p class=equation-like>
                <span class="print tertiary"> 
                “Everyone's doing something <i>everywhere</i>"
                </span>
        </p>
- <span class=accented>transitive</span> if any two points are connected by a group action. Consider the task of taking $x_1\in X$ to $x_2\in X$...
    <p class=equation-like>
                <span class="print tertiary"> 
                (Given an arbitrary task) “It will be done by someone"
                </span>
        </p>
- <span class=accented>regular</span> if transitive and free. This makes
    $X$ a principal homogeneous $G$-space or a [$G$-torsor](/posts/bundles); the group element in the definition of transitivity is unique
    <p class=equation-like>
                <span class="print tertiary"> 
                (Given an arbitrary task) “I know just the person!"
                </span>
        </p>