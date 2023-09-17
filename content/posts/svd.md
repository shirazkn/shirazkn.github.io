---
title: "The SVD Cheatsheet"
date: 2023-06-04T10:10:35-04:00
draft: true
---

### Preliminaries

**Matrices**: Suppose there is a function (also called a transformation or a map), 
$$A:\mathbb R^n \rightarrow \mathbb R^m$$ 
that takes every vector in $\mathbb R^n$ to a vector in (a subspace of) $\mathbb R^m$. Let's also suppose that this function is <span class=accented>linear</span>, which means that

$$\begin{align*}
A(\bold u &+ \bold v) = A(\bold u) + A(\bold v)\\\
\textit{\\&}\qquad \ &
A(k \bold v) = k A(\bold v)
\end{align*}$$
where $\bold u, \bold v \in \mathbb R^n$ and $k\in \mathbb R$. Then we can represent $A(\bold v)$ via matrix-multiplication, written as $\bold A \bold v$. There is (with some [caveats](/posts/matrix)) a unique $n\times m$ matrix $\bold A$ that represents a given linear transformation, $A$. 

**Image**: The image of $\bold A$ is the set of values it actually maps the vectors in $\mathbb R^n$ to, denoted as $\text{Im}(\bold A) \subseteq \mathbb R^m$. While the codomain of $\bold A$ (which is $\mathbb R^m$) is $m$-dimensional, the dimension of $\text{Im}(\bold A)$ may be smaller than $m$.
This is because $\bold A$ might map some subspaces of $\mathbb R^n$ to $\bold 0$: 

<div>
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/linear_algebra/singular_mapping.png>
</figure>
</div>

<!-- The union of the subspaces that are mapped to $\bold 0$ under $\bold A$ is called the *null space* of $\bold A$, denoted as $\text{Null}(\bold A)$.  -->

The dimension of $\text{Im}(\bold A)$ is called as the <span class=accented>$\text{Rank}$</span> of $\bold A$.

At the same time, $\text{Im}(\bold A)$ cannot have dimension greater than $n$. Mapping to a lower-dimensional vector space is akin to '<span class=accented>losing information</span>' (which is possible), whereas mapping to a higher-dimensional vector space is akin to '<span class=accented>creating information out of nowhere</span>' (which is not possible). In the diagram shown above, we 'lost' the information about the height of the cylinder while doing the transformation.

**Orthonormal Matrices**: Suppose we have a set of vectors 

$$\mathcal B=\lbrace \bold b_1 \bold b_2, \dots, \bold b_n \rbrace$$

which form a [basis](/posts/matrix) for $\mathbb R^n$. Then, we can uniquely express a vector $\bold v\in \mathbb R^n$ as a linear combination:

$$\bold v = \sum_{i=1}^n v_i \bold b_i$$

In addition, if $\bold b_1, \bold b_2, \dots, \bold b_n$ are [orthonormal](/posts/matrix), then we have

$$\langle b_i