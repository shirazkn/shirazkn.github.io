---
title: "Sparsity"
date: 2023-04-22T11:05:58-04:00
tags: ["Linear Algebra", "Optimization"]
draft: false
---


The so called [curse of dimensionality](/posts/balls) in machine learning is the observation that neural networks with many parameters can be impossibly difficult to train due to the vastness of its parameter space. Another issue that arises in practice is that most of the neural network does not do anything, as a lot of its weights turn out to be redundant. 
This is because many (if not all) of the problems we're interested in solving as engineers have some inherent <span class=accented>sparsity</span>. Steve Brunton has an [excellent video](https://www.youtube.com/watch?v=Dt2WYkqZfbs) explaining why this is so. 

As a shorthand, the word 'sparse' means 'mostly zeros'. Here is a sparse vector:

<p>
\[x^{\intercal}=[0\ 3\  5\ 0\ 0\  1\ 0\ \dots\ 0\ 8\ 0]^{\intercal}\]
</p>

Often, you might need to transform the original object into another domain, before the object looks sparse. As an example, the function $\sin(t)$ is sparse in the frequency domain (it only has a single frequency component) but is non-sparse in the time domain, because $\sin(t)\neq 0$ for most values of $t$. 
The Fourier transform lets us move back and forth between the  original and sparse domains. A lot of high-dimensional data transfer (like streaming videos, talking on Zoom) relies on exploiting the <span class=accented>sparsity</span> of the information, if not in the frequency domain, then in some other form. (See the post on [Hilbert spaces](/posts/hilbert-spaces) for a more general treatment.)

### Compressive Sensing

A field of research that blew up in the $2000$s is *compressive sensing*, in which a recurring theme is the following observation. Suppose you want to solve the problem $Ax=b$; you know $A$ and $b$, but not $x$. We call this a *system of equations*. It is a high-school math fact that exactly one of the following is true:

- there is a unique $x$ such that $Ax=b$
- there is no $x$ such that $Ax=b$ (<span class=accented>overdetermined</span> and inconsistent system of equations)
- there are infinitely many $x$'s such that $Ax=b$ (<span class=accented>underdetermined</span> system of equations)

The last case arises when $A\in \mathbb R^{m\times n}$ is a 'wide' matrix, with $n>m$. This automatically means that $A$ has a non-trivial nullspace (or kernel)[^rank-nullity], and for any $v\in \ker(A)$, $A(x+v)=Ax$. So we can construct infinitely many solutions this way.

[^rank-nullity]: Use the [rank-nullity](https://en.wikipedia.org/wiki/Rank–nullity_theorem) theorem, and the fact that $\textrm{Rank}(A)\leq \textrm{min}\\;\lbrace m,n\rbrace$ for $A\in\mathbb R^{m\times n}$.

One reason for solving $Ax=b$ might be because $b$ are the measurements that we have of an unknown vector $x$; $A$ is called the measurement matrix. If $n\gg m$, it means that we have far fewer measurements than unknowns (underdetermined system of equations). The theory of compressive sensing says that <span class=accented>it is still possible to recover $x$ uniquely if the solution is known to be sparse</span>.[^conditions] And as we mentioned, the solution oftentimes *is* sparse.
Instead of solving $Ax=b$, we can solve

<p>
\[\begin{array}{ll}
\underset{x\in\mathbb R^n}{\textrm{minimize}} &\|x\|_0\\
\textrm{subject to} & Ax = b
\end{array}
\]
</p>

[^conditions]: In addition, $A$ needs to satisfy one of certain properties, such as the *restricted isometry property*. It essentially ensures that the measurements are somewhat orthogonal to each other, i.e., that we aren't wasting the few measurements we *do* have by making redundant measurements.

which picks out the sparsest solution (in terms of the number of $0$'s in $x$). The notation '$\\|x\\|_0$' is introduced [here](/posts/norms_metrics).
In this way, we can uniquely reconstruct $x$ with a comically small number of measurements. (In fact, it can even beat the [Nyquist sampling theorem](https://en.wikipedia.org/wiki/Nyquist–Shannon_sampling_theorem).) The simple trick of searching for sparse solutions now allows us to do things like MRI imaging much more efficiently.

### Why are sparse solutions special?

So why is it that among the infinitely many solutions of $Ax=b$, the sparsest solution turns out to be precisely the solution we were looking for?

Suppose $A\in \mathbb R^{m \times n}$, $m\leq n$, and $\textrm{Rank}(A)$ is its rank. We know that $r = n- \textrm{Rank}(A)$ is the dimension of its nullspace (see the [rank-nullity theorem](https://en.wikipedia.org/wiki/Rank–nullity_theorem)). Then, the space of the solutions of $Ax=b$ is $r$-dimensional. Moreover, $r\geq n-m$ since $\textrm{Rank}(A)\leq m$. So if we have too few measurements (i.e., a small value of $m$) then the space of solutions is rather large.

Now suppose we know that the *true* solution $x$ is $s$-sparse, i.e., it has at most $s$ non-zero elements. There are $\binom{n}{s}$ ways of choosing where these non-zero elements may appear. Each choice of the location of the non-zero elements (called as the *support* of $x$) defines an $s$-dimensional subspace.
The space of $s$-sparse vectors is the *union* of these $s$-dimensional spaces. For e.g., let $n=3$ and $s=2$, then the $2$-sparse vectors in $\mathbb R^3$ are

<p>
\[\textrm{span}\big(\lbrace [1\ 0\ 0]^{\intercal}, [0\ 1\ 0]^{\intercal}\rbrace\big)\ \cup\  
\textrm{span}\big(\lbrace [1\ 0\ 0]^{\intercal}, [0\ 0\ 1]^{\intercal}\rbrace\big)\\
\cup \ 
\textrm{span}\big(\lbrace [0\ 1\ 0]^{\intercal}, [0\ 0\ 1]^{\intercal}\rbrace\big) 
\]
</p>

Unions of two subspaces is much smaller than the $\textrm{span}$ of them. The set of all $1$-sparse vectors in $\mathbb R^n$ is the union of the axes or the standard basis vectors of $\mathbb R^n$, but the axes obviously *span* the whole space. Thus, even when $n\gg m$, we can intersect this large $r$-dimensional space of solutions with the tiny $s$-dimensional slices to find the special, sparse solutions of $Ax=b$.

In [the next post](/posts/sparsity_2), I talk about why we can also swap $\lVert x\rVert_0$ out for $\lVert x\rVert_1$ in practice, and still recover $x$ uniquely and perfectly in many cases. Minimization of $\lVert x\rVert_0$ is a combinatorial problem (which means that the computational effort required to solve it scales exponentially in the dimension of the problem), but minimization of $\lVert x\rVert_1$ is a *convex optimization* problem, which admits efficient, scalable algorithms for solving it.