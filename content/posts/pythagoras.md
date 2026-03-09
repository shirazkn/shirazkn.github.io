---
title: "The Parallelogram Law"
date: 2023-04-14T15:53:46-04:00
tags: ["Linear Algebra"]
draft: false
bgImage: /post-images/linear_algebra/parallelogram_1.png
summary: I mentioned in the last post that Euclidean geometry arises by taking the real numbers and endowing it with an inner product, at which point it satisfies the Pythagoras theorem. In this post I will talk about how the Pythagoras theorem is a special case of a more general feature of inner product spaces.
---

To quote [this math podcast](https://theartofmathematicspodcast.com), "the real world is a special case". I mentioned in the last post that Euclidean geometry arises by taking $\mathbb R^2$ or $\mathbb R^3$ and endowing it with an inner product, at which point it satisfies the Pythagoras theorem.
In this post I will talk about how the <span class=accented>Pythagoras theorem</span> is a special case of a more general feature of inner product spaces. Contents of [the last post](/posts/norms_metrics) are pre-requisites for this one.
###  [The Parallelogram Law](https://en.wikipedia.org/wiki/Parallelogram_law)

Let $x$ and $y$ be two vectors in a normed vector space that we are interested in.
Recall that the existence of an inner product $\langle x, y\rangle$ implies the existence of a corresponding norm, $\lVert x\rVert = \sqrt{\langle x, x\rangle}$. But the converse direction is not always true.
When it *is* true, is precisely when the normed vector space obeys the parallelogram law; for all vectors $x$ and $y$,

<p>
\[2\|x\|^2 + 2\|y\|^2 = \|x+y\|^2 + \|x-y\|^2 \]
</p>

<div>
<figure class=invertible>
<img src=/post-images/linear_algebra/parallelogram_1.png>
</figure>
</div>

The name of this law comes from the special case of $\mathbb R^2$ shown above, where it is a relationship between the side lengths and diagonals of a parallelogram. Notably, if $\lVert x+y \rVert=\lVert x-y \rVert$, i.e., the parallelogram is a rectangle, then we recover the Pythagoras theorem. Thus, the Pythagoras theorem is a corollary (i.e., a byproduct) of the fact that $\mathbb R^2$ equipped with the Euclidean norm $\lVert{}\cdot{}\rVert_2$ satisfies the parallelogram law.

Next, let's see why the validity of the parallelogram law coincides with the existence of an inner product.

### Symmetric Bilinear Forms

A <span class=accented>symmetric bilinear form</span> is a map $\phi(x,y)$ that takes two vectors $x$ and $y$ of a vector space and gives a real number[^2], much like an inner product or a metric does. A symmetric bilinear form is symmetric

[^2]: ... more generally, an element of the [field](https://en.wikipedia.org/wiki/Symmetric_bilinear_form) of that vector space, which is $\mathbb C$ for complex vector spaces, and so on. We can generalize the above discussion to vector spaces over other fields if we were so inclined.

<p>
\[
\phi(x, y) = \phi(y,x)
\]
</p>

and bilinear 

<p>
\[
\phi(x+y, z+w) = \phi(x,z) + \phi(x,w) + \phi(y,z) + \phi(y,w)
\]
</p>

which means that it is linear in either argument.
As a part of what we require of an inner product in a real vector space, they must be positive-definite symmetric bilinear forms. Positive definite means that $\phi(x,x)\geq 0$ and $\phi(x,x)=0$ $\Leftrightarrow$ $x=0$. 

Now, if we set $z=x$ and $w=y$ in the above expression, and using the positive-definite, symmetric, and bilinear properties of inner products, we get

<p>
\[
    \langle x+y, x+y \rangle = \langle x,x \rangle + \langle x,y \rangle + \langle y,x \rangle + \langle y,y \rangle
\]
\[
   \| x+y\|^2 = \| x \|^2 + 2 \langle x,y \rangle + \| y\|^2
\]
</p>

where we used the notation, $\lVert x\rVert = \sqrt{\langle x, x\rangle}$.
As $(-y)$ is also an element of our vector space, we can repeat the same steps to get 
<p>
\[
   \| x-y\|^2 = \| x \|^2 - 2 \langle x,y \rangle + \| y\|^2
\]
</p>

The sum of the last two equations is the parallelogram law, whereas
subtracting the second equation from the first gives us 

<p>
\[
   \langle x,y \rangle = \frac{\|x+y\|^2 - \|x-y\|^2}{4}
\]
</p>

Observe that we can use the preceding equation as a *definition* for the inner product in terms of the underlying norm.
Thus, normed vector spaces satisfying the parallelogram law have a unique inner product, which is defined as above. What remains to be shown is that this definition of an inner product using a norm, combined with the parallelogram law (which our norm supposedly satisfies), indeed [satisfies all of the requirements that the inner product should](https://mathoverflow.net/questions/123/linearity-of-the-inner-product-using-the-parallelogram-law).

### Special Cases
Suppose the normed space we were working with was $\mathbb R^n$ with the $2$-norm, $\lVert{}\cdot{}\rVert_2$, then as one would expect, the unique inner product we get is the dot product for finite-dimensional vectors $x$ and $y$, which we usually write as $x^Ty$ or $x\cdot y$ in place of the more general notation of $\langle x, y \rangle$. Other $p$-norms do not satisfy the parallelogram law, and hence do not have an associated inner product.

As we saw, specializing the underlying vector space to $\mathbb R^2$ makes the parallelogram law a relationship between the sides and diagonals of a parallelogram. Further specializing to the case where $x$ and $y$ make an angle of $90^\circ$ between each other, i.e., $\langle x,y\rangle = 0$, yields the Pythagoras theorem. 

Finally, in $\mathbb R$, the law takes its most plausible form:

<p>
\[
   (x+y)^2 + (x-y)^2 = 2x^2 + 2y^2
   \]
</p>

<hr>

**Update**: Someone on Mathstodon pointed out to me that what the parallelogram law is *really* saying is that the norm-squared function $f(x)=\lVert x\rVert^2$ is a degree $2$ polynomial. Let's explore this real quick.


Notice that a degree $2$ polynomial is characterized by the fact that its second derivative is constant everywhere. Suppose, this constant (which is the Hessian) is $c\cdot\mathbf I$, where $c$ is some number and $\mathbf I$ is the identity matrix. Let's take the Taylor series expansion of $f$ at $x$, sticking to the Euclidean space $\mathbb R^n$ for simplicity.

<p>
\[
  f(x+y) = f(x) + f'(x)^T y + \frac{1}{2} y^Tf''(x)y \]
  \[ \qquad \ = f(x) + f'(x)^T y + \frac{c}{2} f(y) 
   \]
</p>

Similarly,

<p>
\[
  f(x-y) = f(x) - f'(x)^T y + \frac{c}{2} f(y) 
   \]
</p>

Adding these,

<p>
\[ f(x+y) + f(x-y) = 2 f(x) + c f(y) \]
</p>

Naturally, we set $c=2$. Thus, we could potentially simplify the parallelogram law to: <span class=accented> The norm-squared function is a polynomial of degree $2$</span>, which sounds more fundamental and less arbitrary than the parallelogram law to me, let alone the Pythagoras theorem. But we need to do more work to generalize this math to hold outside of Euclidean spaces. 

