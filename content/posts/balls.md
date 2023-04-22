---
title: "Balls"
date: 2023-04-18T21:32:10-04:00
draft: false
tags: ["Linear Algebra"]
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

The figure may indicate that $\lVert{}\cdot{}\rVert_p$ gets bigger as $p$ increases, but it's the other way around: 

<p>\[\|x\|_1 \geq \|x\|_2 \geq \dots \geq \|x\|_\infty\]</p>

because you need to go *further* from the origin to get to the $\infty$ ball. This is similar to how a car with a *poorer* mileage would need to expend *more* fuel to get to the same point. So the balls get bigger, but the 'mileage' gets smaller.

Recall that if $p<1$, then '$p$-norm' is not actually a norm, as it is guaranteed to violate [the conditions](/posts/norms_metrics) which we usually place on a norm. What feature do we see appearing in the $p$-balls, when $p<1$? They answer is that they curve inwards (are *non-convex*). In particular, the $0$-ball is quite bizarre, it is exactly the axes! (Recall that the "$0$-norm" counts the number of non-zero elements in a vector, which is $1$ for each point on the axes). Let's not talk about the $0$-ball for now.

### The $2$-Ball

When $n=2$ the $2$-ball is a circle, and when $n=3$ the $2$-ball is a sphere. What's less obvious is the case of $n=1$, in which case each of the $p$-norm unit balls is just the line segment from $-1$ to $1$.

We may or may not remember from high-school physics that spheres (i.e., $2$-balls) minimize the ratio of the surface area to volume of a shape. It is why bubbles take spherical shapes, in order to minimize their potential energy. A defining feature of the $2$-ball is that it has continuous rotational symmetry -- we can rotate the $2$-ball without changing its shape, something we cannot do for any of the other $p$-balls. 
<!-- We looked at the $2$-norm in detail in [earlier posts](/posts/leastsquares). Specifically, we observe that we can rotate the $2$-balls without changing its shape, something we cannot do for any of the other $p$-balls. -->

### The $\infty$-Ball

Recall that the $\infty$-norm is evaluated by taking the limit $p\rightarrow \infty$ in the definition of the $p$-norm, giving

<p>
\[
    \|x\|_\infty=\max\left\lbrace|x_1|, |x_2|, \dots, |x_n|\right\rbrace
    \]
</p>

The $\lVert{}\cdot{}\rVert_\infty$ unit ball is always a cube in each dimension, it can be treated as the definition of a <span class=accented>unit cube</span>.
As such, it has $2n$ faces in dimension $n$. This is because

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

which gives us $2n$ linear constraints, with each linear constraint adding a face.

### The $1$-Ball

The $1$-Ball in $2$ dimensions seems like a rotated square, or a diamond, and it appears like this should generalize. Let's count its faces.

<p>
\[
|x_1| + |x_2|  + \dots + |x_n| \leq 1
 \quad  \Leftrightarrow \quad
  \pm x_1 \pm x_2  \pm \dots \pm x_n \leq 1
    \]
</p>

where each '$\pm$' indicates that we can choose either sign to obtain a different inequality. The total number of linear inequalities that we can construct is $2^n$. So $1$-balls have many, many more faces than $\infty$-balls in higher dimensions! 

This observation has consequences in the field of *optimization*; [some poor bloke here](https://math.stackexchange.com/questions/2287818/writing-the-unit-ell-1-ball-in-mathbbrn-as-the-intersection-of-closed-h) is trying to check whether a given vector $x$ lies inside the $1$-ball. They write this out as a system of linear inequalities,
 only to realize that it would take an exponentially large number of linear inequalities to do this.
<!-- I will explore $1$-balls more in a later post when I talk about compressive sensing, a field in which the $1$-ball plays a foundational role. -->

<!-- The particular face in the positive quadrant of the $1$-ball, with $x_i\geq 0 \forall i$, is called the *probability simplex* -->

### Equivalence of Norms

Given any two numbers $p_1$ and $p_2$ between 0 and $\infty$, with $1\leq p_1,p_2\leq \infty$, we can <span class=accented>place $p_1$-balls inside and outside a given $p_2$-ball</span> so that they touch.
Two examples of this are as follows:

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 80%;">
<img src=/post-images/linear_algebra/equivalence.png>
</figure>
</div>

This is what is meant when we say that the $p$-norms are *equivalent*. Vectors are big (or small) in one norm if and only if they're big (or small) in the other. 'Big' and 'small' are used very subjectively here.

## Higher Dimensions

We can use everything we just introduced to show interesting quirks of high-dimensional geometry. While this is an entertaining discussion in its own right, it has important consequences in fields like deep learning and probability theory.

**The Construction:** Consider placing a cube of side length $2$ centred at the origin, as well as a green cube with side length $4$. Then place a sphere at each of the corners of the (inner) cube so that they touch each other, as follows:

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/spheres_on_cube.png>
</figure>
</div>

where by 'sphere' and 'cube' we really mean hypersphere and hypercube, which are their corresponding higher dimensional analogues. Finally, we try to *squeeze in* a new <span>orange sphere</span> at the centre. The entire configuration fits snugly inside the bigger green cube, and the maroon/pink spheres are in some sense 'tightly packed' inside the green cube. The figure above is for dimension $2$. 

**Some Observations:**
Let's say we are in some higher dimension, $n$. If this feels like unfamiliar territory, we can think of these as $2$-balls and $\infty$-balls, so we have all the machinery needed to be able to think about these high-dimensional objects at some capacity. For example, we know the following:

1. From the origin, we can travel exactly $1$ unit along any axis to reach the cube
2. The radii of the spheres at the corners is $1$
3. The corners of the cube are $\sqrt n$ away from the origin, in terms of the [Euclidean distance](/posts/norms_metrics) (or by a repeated application of [the Pythagoras theorem](/posts/pythagoras))

When $n\gg1$, the corners of the cube are extremely ($\sqrt n$) far from the origin, whereas the faces are still $1$ unit away. People often phrase this as 
"<span class=accented>higher dimensional cubes are spiky</span>". Here are some weirder facts:

4. The spheres at the corners still have radius $1$
5. There are $2^n$ spheres at the corners, because there are $2^n$ corners for the cube

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/inner_sphere.png>
</figure>
</div>

6. The orange sphere has a radius of $\sqrt n -1$

Thus, in $1$ dimension, the orange sphere has radius $0$. In $3$ dimensions it has radius $\sqrt 3 -1$. In $4$ dimensions it has radius... $1$? It's the same size as the spheres at the corners... and it touches the faces of the inner cube...

7. In the $10^{th}$ dimension, the sphere in the middle sticks out of the green cube.

Because the corners of the black box have moved far from the origin, so have the unit spheres we placed at them, making more room for the orange sphere to expand with the dimension.

<hr>

### Going Inwards

Let's take now the following construction, where we inscribe a purple sphere inside the inner cube. These are precisely the unit balls of the $2$ and $\infty$ norms:

<div>
<!-- <figure class=invertible style="max-width: 25%;"> -->
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/sphere_in_cube.png>
</figure>
</div>

We saw that the $\infty$-ball always touches the $2$-ball from the outside, so even if we turn up the dimension, the sphere better remain contained within the cube. But the corners are still moving away from the origin, so the cube seems to be getting comparatively larger. Let $\text{Vol}({}\cdot{})$ denote the volume (given by the [Lebesgue measure](https://en.wikipedia.org/wiki/Lebesgue_measure)) of a set.

<p>
\[\frac{\text{Vol}\left(\textit{\ Unit Sphere in }\mathbb R^n\ \right)}{\text{Vol}\left(\textit{\ Unit Cube in }\mathbb R^n\ \right)}\  \rightarrow\  0\qquad \text{as}\ n\rightarrow \infty \]
</p>

The higher dimensional sphere is insignificantly small in comparison to the cube.

There's a variety of ways of showing this, though it's less straightforward than the stuff we did so far. My favorite proof of this (or rather, a comparable) result is from Durett's book on probability, where he shows it using the law of large numbers! The reason it stands out in my memory is not only because of the absurdity of showing a fact of geometry using something so seemingly far removed from geometry, but
because he prefaces the result with the sentence, "*Our next result is for comic relief.*" It's given in example $2.2.5$ of Probability Theory by Rick Durett. Specifically, the probabilistic argument shows that almost all of the volume of the cube is concentrated within some thin shell, somewhere between its center and its corners. It's about as bizarre as it sounds.

<hr>

A quirk that shows up repeatedly in deep learning in various forms is the so-called <span class=accented>curse of dimensionality</span>. It usually refers to one of several things, but one of these is the vanishing of the higher dimensional sphere. Think of each dimension in the preceding analysis as the *weight* of a neural network. The ambient space (where the orange sphere lives) is like the *parameter space* of the neural network; it is the set of all possible combinations of weights. Searching for the right combination of weights (the sphere) in the much larger parameter space (the cube) becomes more and more futile as the number of weights (the dimension) increases.

On the other hand, Durett's 'volume concentration' example, and other quirks of higher dimensional geometry constitute what some researchers call the [blessing of dimensionality](https://citeseerx.ist.psu.edu/doc/10.1.1.329.3392). Of the different things it can refer to, one of the observations is that as the dimension increases, random sampling from this high-dimensional space becomes more and more well-behaved. It can be used to facilitate, rather than hinder high-dimensional computational tasks, so long as one knows what to watch out for.