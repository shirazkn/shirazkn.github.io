---
title: "Balls"
date: 2023-04-18T21:32:10-04:00
draft: true
tags: ["Linear Algebra", "Probability"]
---

Let's talk about balls. Specifically, I want to look at unit balls corresponding to the different $p$-norms in $\mathbb R^n$, where $n$ is the dimension of the space. For a vector $v\in \mathbb R^n$, the $p$-norm is

<p>
\[
    \|x\|_p \coloneqq \left(\sum_i |x_i|^p\right)^{\frac{1}{p}}
\]
</p>

When $p=2$ this is the usual Euclidean distance. The corresponding ball is what we think of when someone says *ball*, it is all the points that are within a given distance from the origin. More generally, the ball of 'radius' $r$ corresponding to a norm $\lVert{}\cdot{}\rVert$ is

<p>
\[\lbrace x\ |\ x\in\mathbb R^n, \|x\|\leq r\rbrace\]
</p>

Let's call the ball corresponding to $\lVert{}\cdot{}\rVert_p$ as the $p$-ball. If $r=1$, we will call it a unit ball.
[This website](https://mimmackk.github.io/unitball/) shows the unit balls corresponding to other $p$-norms. Here is my artistic illustration of the same:

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/NormBalls.png>
</figure>
</div>

Recall that if $p<1$, then '$p$-norm' is not actually a norm, as it is guaranteed to violate [the conditions](/posts/norms_metrics) which we usually place on a norm. What feature do we see appearing in the $p$-balls, when $p<1$? They answer is that they curve inwards (are *non-convex*). In particular, the $0$-ball is quite bizarre, it is the black lines! All the points on the black lines have a $\lVert{}\cdot{}\rVert_0$ value of $1$. Let's look at some of the $p$-balls in more detail, and then compare them.

### The $2$-Ball

When $n=2$ the $2$-ball is a circle, and when $n=3$ the $2$-ball is a sphere. What's less obvious is the case of $n=1$, in which case all the $p$-norm unit balls are just a line segment from $-1$ to $1$.

We may or may not remember from high-school physics that spheres (i.e., $2$-balls) minimize the ratio of the surface area to volume of a shape. It is why bubbles take spherical shapes, in order to minimize their potential energy. We looked at the $2$-norm in detail in [earlier posts](/posts/leastsquares). Specifically, we observe that we can rotate the $2$-balls without changing its shape, something we cannot do for any of the other $p$-balls.

### The $\infty$-Ball

Recall that the $\infty$-norm is evaluated by taking the limit $p\rightarrow \infty$ in the definition of the $p$-norm, giving

<p>
\[
    \|x\|_\infty=\max\left\lbrace|x_1|, |x_2|, \dots, |x_n|\right\rbrace
    \]
</p>

The $\lVert{}\cdot{}\rVert|\infty$ unit ball is always a cube in each dimension, it can be treated as the definition of a *unit cube*. As such, it has $2n$ faces in dimension $n$. More formally, this is because

<p>
\[
  \max\left\lbrace|x_1|, |x_2|, \dots, |x_n|\right\rbrace \leq 1
    \]
    \[
  \Updownarrow
    \]
\[
 |x_1|\leq 1\quad \text{and}\quad |x_2|\leq 1\quad \text{and}\quad \dots\quad |x_n|\leq 1 
 \]
 \[
  \Updownarrow
    \]
\[
 x_1\leq 1\quad \text{and}\quad -x_1\leq 1\quad \dots\quad x_n\leq 1 \quad \text{and}\quad -x_n\leq 1
 \]
</p>

which gives us $2n$ linear constraints, each constraint adding a face. The $\infty$-ball also seems like the biggest of them all; this will have interesting consequences later in the post (or in a future post, based on how this goes).

### The $1$-Ball

The $1$-Ball in $2$ dimensions seems like a rotated square, or a diamond, and it appears like this should generalize. Let's count its faces.

<p>
\[
|x_1| + |x_2|  + \dots + |x_n| \leq 1
 \quad  \Leftrightarrow \quad
  \pm x_1 \pm x_2  \pm \dots \pm x_n \leq 1
    \]
</p>

where each '$\pm$' indicates that we can choose either sign to obtain a different inequality. The total number of linear inequalities that we can construct is $2^n$. So $1$-balls have many, many more faces than $\infty$-balls in higher dimensions! I'm not sure if this has any immediate consequences, but it's cool to think about.
<!-- I will explore $1$-balls more in a later post when I talk about compressive sensing, a field in which the $1$-ball plays a foundational role. -->

<!-- The particular face in the positive quadrant of the $1$-ball, with $x_i\geq 0 \forall i$, is called the *probability simplex* -->

### Equivalence of Norms

Given any two numbers $p_1$ and $p_2$ between 0 and $\infty$, with $0<p_1,p_2\leq \infty$, we can place $p_1$-balls inside and outside a given $p_2$ ball so that they touch. Let's take $p_1=2$ and $p_2=\infty$, then we have the following picture:

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/NormBalls.png>
</figure>
</div>


Whereas if $p_1=\infty$ and $p_2=1$, we have

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/NormBalls.png>
</figure>
</div>


and so on.