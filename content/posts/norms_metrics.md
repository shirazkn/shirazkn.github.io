---
title: "Norms, Metrics, and Inner Products"
date: 2023-04-10T12:20:23-04:00
tags: ["Linear Algebra"]
draft: false
---

This is an explainer on norms, metrics, and inner products, and their relationships to each other.

### Norms

A norm is any real-valued function $\lVert{}\cdot{}\rVert$ (taking the elements of a corresponding vector space as its arguments), which has the following properties:
1. It is nonnegative, and $0$ only at the 'zero element' (for e.g., at the origin of $\mathbb R^n$).

2. $\lVert \alpha x \rVert = |\alpha| \lVert x \rVert$ for any scalar $\alpha$.

3. It satisfies the triangle inequality, 

<p>\[
\|x+y\|\leq \|x\| + \|y\|
\]</p>

We start by defining the usual vector <span class=accented>$p$-norm</span>:

<p>\[
\|x\|_p \coloneqq \left(\sum_i |x_i|^p\right)^{\frac{1}{p}}
\]</p>

The cases of $p=0$ and $\infty$ are evaluated using limits, and thus take special forms:

<p>\[
\|x\|_0 = \sum_i |x_i|^0
\]
\[
\|x\|_\infty=\max\left\lbrace|x_1|, |x_2|, \dots, |x_n|\right\rbrace
\]</p>

where $0^0$ is defined as $0$. So, $\lVert x\rVert_0$ counts the number of non-zero entries in the vector, whereas $\lVert x\rVert_\infty$ picks out the maximum (in magnitude) entry of the vector.

Actually, $\lVert x\rVert_0$ isn't really a norm (it fails property no. $2$, for one), but it still gets called the "$0$-norm" for convenience. I've seen some authors call it a *pseudonorm*. The "$0$-norm" has exploded in popularity due to its applications in the field of *compressive sensing*. 
<!-- It's used to reconstruct sparse vectors, those that only have a few non-zero entries. This is akin to searching for compressed information, since sparse vectors can be stored in computers using fewer numbers than are required for general vectors.  -->

### Metrics

While a norm takes one operand, distances/metrics take two operands. Observe that a norm can be interpreted as 'the distance from the origin'. In fact, all norms give rise to a corresponding distance/metric for that space. The $p$-norm norm gives rise to (or as mathematicians say, *induces*) the <span class=accented>Minkowski distance</span> for $\mathbb R^n$. Given $x,y\in\mathbb R^n$, the Minkowski distance/metric is

<p>
\[
   D_p(x,y) \coloneqq \| x-y\|_p = \left(\sum_i |x_i-y_i|^p\right)^{\frac{1}{p}}
    \]
</p>

When $p$=2, this is the <span class=accented>Euclidean distance</span>, the one we learn early on in our mathematical careers in the form of the Pythagoras theorem. The other interesting cases are when $p$ is $0$, $1$ or $\infty$, in which cases it's called the Hamming, Manhattan, or Chebychev distance. Metrics must satisfy properties that are analogous to those for norms *except* property no. $2$ (so the "$0$-norm" actually defines a proper metric even though it's not a norm). In addition, metrics should satisfy the symmetry condition: $D(x,y)=D(y,x)$.



The space $\mathbb R^n$ together with a norm $\lVert{}\cdot{}\rVert_p$ is called a <span class=accented>normed space</span>, whereas $\mathbb R^n$ together with the distance $D_p(\cdot,{}\cdot)$ is called a <span class=accented>metric space</span>. 

### Inner Products

There is an additional notion of an inner product (which generalizes the 'dot product' for vectors), giving an <span class=accented>inner product space</span>. 
Like metrics, an inner product takes two operands, $x$ and $y$, and gives a real number denoted by $\langle x,y \rangle$. It induces a corresponding norm, given by $\lVert x \rVert = \sqrt{\langle x,x \rangle}$. Thus, an inner product space is a normed space, and a normed space is a metric space. Neither of the converse directions is true.

Inner product spaces are the most rare, or rather, we impose [very specific conditions](https://en.wikipedia.org/wiki/Inner_product_space) on inner product spaces which makes them so rare. This also means that they are endowed with a lot of structure; it takes more words to describe an intricate sculpture than it does to, say, describe a block of stone. Mathematicians like to say that inner product spaces are *rich* in structure. They allow us to define geometric concepts such as angles, which may not be easy to define for general metric spaces. The angle between two vectors $x$ and $y$ can be defined as

<p>\[
\theta = \arccos\left(\frac{\langle x,y \rangle}{\sqrt{\langle x, x\rangle \langle y, y\rangle}}\right)
\]</p>

This definition works not only in higher dimensional Euclidean spaces, but in *any* inner product space, including function spaces.

The only distance that comes from an inner product is the Euclidean distance ($p$=2), which comes from our most familiar inner product -- the dot product in $\mathbb R^n$:

<p>\[
D_2(x,y) = \|x-y\|_2 = \sqrt{(x-y)\cdot (x-y)}
\]</p>

The dot product induces the  $2$-norm which induces the Euclidean distance, so the whole gang is here.
This is why we typically call $\mathbb R^n$ the Euclidean space; since there is only one canonical inner product for it (the dot product), we don't particularly mind restricting ourselves to the $p=2$ case because it feels somewhat natural to the space. 

Thus, inner products are the most rarest of them all, but also have the most structure. Metrics/distances are on the other extreme, because all Minkowski distances with $0\leq p\leq \infty$ are proper metrics, but only $p=2$ corresponds to an inner product. Norms are sandwiched in between the two in terms of their rarity; "$p$-norms" are proper norms only when $p \geq 1$.

<p>\[
\text{Inner Product Spaces} \subset \text{Normed Vector Spaces} \subset \text{Metric Spaces}
\]</p>

or in terms of the values for $p$, we can write

<p>\[
\lbrace 2 \rbrace \subset [1, \infty] \subset [0, \infty]
\]</p>

An interesting observation which always trips me up is that metric spaces don't have to be vector spaces, or vice versa.


### What's so special about $2$ anyway?

[Once again](/posts/leastsquares), I am annoyed by the special place that $2$ takes in this hierarchy of spaces. It has a host of interesting properties (which I will link in this post if I ever decide to explore them further):

1. The Euclidean distance ($p=2$) is the only distance that comes from an inner product.

1. The unit balls corresponding to the $2$-norm,  $\lbrace x : \lVert x \rVert_2\leq1 \rbrace$ are spherical.

1. For this reason, the Euclidean distance ($p=2$) has [the richest rotational isometry group](https://mathoverflow.net/questions/64443/which-norms-have-rich-isometry-groups)[^foot]. This is related to the observation that rotation of a sphere does not 'change its shape', but rotating a non-spherical object can 'change its shape'. In fact, for $p\neq2$, the other Minkowski distances do not have any continuous rotational isometries because their unit balls are non-spherical and somewhat pointy.

1. The Euclidean space (the space $\mathbb R^n$ combined with the $2$-norm induced distance) [can be uniquely characterized by the fact that the distance-squared function is differentiable everywhere](https://mathstodon.xyz/@francisbrb/109908877121683860).

[^foot]: I'm not too knowledgable about group theory, so expect an abuse of terminology here.

The last one was fascinating to me because the differentiability fails not only if you change the distance function, but also if you change to a different topological space, like say, a circle! So not only is the Euclidean distance special, the Euclidean space $\mathbb R^n$ is itself quite special when equipped with the Euclidean distance.