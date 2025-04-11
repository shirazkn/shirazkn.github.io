---
title: "On the Fourier Transform(s)"
date: 2024-12-12T13:02:50+05:30
draft: true
---

The <span class=accented>Fourier transform</span> in $\mathbb R^n$ maps a complex-valued function $f:\mathbb R^n \rightarrow \mathbb C$ to a function of its [Pontryagin dual](https://en.wikipedia.org/wiki/Pontryagin_duality) space (which is in this case also $\mathbb R^n$), $\ \hat f:\mathbb R^n \rightarrow \mathbb C$, given by

<p>
\[
    \begin{align*}
\hat f&(\bm \omega) \\&\coloneqq \int_{\mathbb R^n} f(\mathbf x) e^{-i\hspace{1pt} 2\pi \langle \bm \omega, \mathbf x\rangle} d\mathbf x\\
&= \int_{\mathbb R}\cdots\int_{\mathbb R} f(\mathbf x) \left(e^{-i \hspace{1pt}2\pi \omega^1 x^1}\cdots e^{-i \hspace{1pt}2\pi \omega^n x^n}\right) dx^1 \cdots dx^n\\
&= \cdots \left(\int_{\mathbb R}\left(\int_{\mathbb R} f(\mathbf x) e^{-i\hspace{1pt}2\pi \omega^1 x^1}dx^1 \right) e^{-i\hspace{1pt}2\pi \omega^2 x^2} dx^2 \right)\cdots 
    \end{align*}
\]
</p>

That is, it iteratively performs the Fourier transform (FT) in each dimension. On compact quotient groups of $\mathbb R^n$, like $\mathbb T^n \cong \mathbb R^n/\mathbb Z^n$ (where each $\mathbb T\cong S^1$ is the one-dimensional [torus](https://en.wikipedia.org/wiki/Torus)), this becomes a [Fourier series](/posts/fourier).

## Discretization & Computation

Since we know that the $n$-dimensional FT is really just the one-dimensional FT iterated, let's begin by considering a discretization of the latter. Consider a function $f: \mathbb R \rightarrow \mathbb C$ that was sampled at a regularly-spaced <span class=accented>lattice</span> in $\mathbb R$, i.e., a
 countably infinite number of points $(x_j)_{j\in \mathbb Z}$ with $\Delta \coloneqq(x\_j - x\_{j-1})$ denoting the "sampling period". For simplicity, let $x_0 = 0$ so that $x_j = j \Delta$.
 The Fourier transform integral can be discretized such that the resulting summation only depends on the information we have access to:

$$ \tilde f(\omega) \coloneqq \sum_{j\in \mathbb Z} f(x_j) e^{-i\hspace{1pt}2\pi \omega x_j} \Delta  \approx \int_{\mathbb R} f(x) e^{-i\hspace{1pt}2\pi \omega x}dx = \hat f(\omega). $$

Now, 

<!-- 
<p>
\[
    \begin{align*}

    \end{align*}
\]
</p> 
-->

<p>
\[
    \begin{align*}
\tilde f(\omega + \tfrac{1}{\Delta}) &= \sum_{j\in \mathbb Z} f(x_j) e^{-i\hspace{1pt}2\pi \left(\omega + \tfrac{1}{\Delta} \right)j\Delta} \Delta\\
&= \sum_{j\in \mathbb Z} f(x_j) e^{-i\hspace{1pt}2\pi \omega j \Delta} \Delta
    \\
    &= \tilde f(\omega),
    \end{align*}
\]
</p>

showing that $\tilde f$ is periodic with period $\tfrac{1}{\Delta}$. The transform $f \mapsto \tilde f$ is called the [Discrete-Time Fourier Transform](https://en.wikipedia.org/wiki/Discrete-time_Fourier_transform) (DTFT). The periodicity of $\tilde f$ introduces limits in the inverse transform.

If we have only a finite number of samples $(x_i)_{i=0}^{N-1}$, then we obtain the (rather confusingly named) [Discrete Fourier Transform (DFT)](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Definition). To do this, we assume that the samples are periodic with period $N$; perhaps this periodicity is due to the underlying periodicity of $f$, or perhaps we naively let the function be periodic outside its original domain, $[0, N\Delta] \subseteq \mathbb Z$, because we simply do not care about the behavior of $f$ outside of this domain. This means that[^1]

[^1]: I should remind you here that I am not a mathematician by training. The summations will be interchanged at will.

<p>
\[
    \begin{align}
\tilde f(\omega) &= \sum_{j\in \mathbb Z} f(x_j) e^{-i\hspace{1pt}2\pi \omega j \Delta} \Delta \\
&= \sum_{k\in \mathbb Z}\sum_{j=0}^{N-1} f(x_j) e^{-i\hspace{1pt}2\pi \omega (k N + j) \Delta} \Delta\\
&= \sum_{j=0}^{N-1} f(x_j) \left(\sum_{k\in \mathbb Z}e^{-i\hspace{1pt}2\pi \omega k N  \Delta}\right) e^{-i\hspace{1pt}2\pi \omega j \Delta}\Delta
\end{align}
\]
</p>

Relying once again on the strange [Poisson summation formula](/posts/fourier/#the-poisson-summation-formula), we have

<p>
\[
    \begin{align}
\tilde f(\omega) 
&= \sum_{j=0}^{N-1} f(x_j) \left(2\pi \sum_{k\in \mathbb Z} \delta(\omega N \Delta + k) \right) e^{-i\hspace{1pt}2\pi  \omega j \Delta}\Delta
\end{align}
\]
</p>

Thus, the DTFT of a periodic sequence is non-zero precisely when $\omega N \Delta$ is an integer, i.e., $\omega = \ell/N\Delta$ for some $\ell \in\mathbb Z$. Since 

$$\tilde f\left(\frac{\ell + N}{N\Delta}\right) = \tilde f\left(\frac{\ell}{N\Delta} + \frac{1}{\Delta}\right) = \tilde f\left(\frac{\ell}{N\Delta}\right),$$

we only need to compute $N$ "coefficients" to realize this transform. In summary, the DFT can be thought of as "the DTFT of a finite sequence of samples", as computed under the assumption that the function is periodic outside the domain of the observed samples. In turn, the DTFT is simply a discretization of the FT.

Finally, the [Fast Fourier Transform (FFT)](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Definition) is just a way to compute the DFT efficiently by exploiting the underlying redundancy of the computations. MATLAB has [a function](https://www.mathworks.com/help/matlab/ref/fftn.html) for computing the $n$-dimensional FFT, whose documentation mentions that this is mathematically just the one-dimensional FFT iterated.

## The Compact, Non-Abelian Case

Now, the theory of Pontryagin duality breaks down on non-Abelian groups (although an [extension](https://en.wikipedia.org/wiki/Tannaka%E2%80%93Krein_duality) of it does exist). We can nonetheless ask whether a function $f:G \rightarrow \mathbb C$
may be transformed, without loss of information, into another function $\hat f: \hat G \rightarrow \mathbb C$, where $\hat G$ is some sort of a *dual space*. The answer is yes, but the details are intricate.

Instead of things like $e^{-i \omega x}$, one needs to introduce the so-called <span class=accented>irreducible unitary representations</span> (IURs) of $G$. A <span class=accented>representation</span> $U:G \rightarrow GL(V)$ is a group homomorphism from $G$ to the invertible linear operators on some vector space $V$. It is <span class=accented>unitary</span> if $V$ comes with an inner product and $U(g)$ is unitary for all $g \in G$. We won't worry about what *irreducible* means, here. Note that $U(g^{-1}) = U(g)^{-1} = U(g)^{\dagger}$. For instance, $e^{i\omega x}$ is an IUR of $\mathbb R$, whose complex conjugate is $e^{-i\omega x}$. For $SU(2)$, the IURs act on homogeneous polynomials (which can be given a vector space structure); a subset of the $SU(2)$ IURs become the IURs for $SO(3)$.

The dual space $\hat G$ is the space of all equivalence classes of IURs of $G$ (see the book by Folland for details). Let's say that the equivalence classes of IURs can be parameterized by some $\lambda$, so that $\big(\hspace{1pt} U^\lambda \mathrel\vert \lambda \in \hat G \big)$ represents all the distinct IURs (i.e., does not double-count any IURs that are equivalent). The <span class=accented>Fourier transform</span> of $f$ (square-integrable function on $G$) is then given by[^ref]

$$\hat f(\lambda) = \int_G f(g) U^\lambda(g^{-1}) dg= \int_G f(g) U^\lambda(g)^{\dagger} dg,$$

[^ref]: See *A Course an Abstract Harmonic Analysis* by Folland (Sec. 4.2) or Chirikjian and Kyatkin (Sec. 8.3.2).

where $dg$ is the Haar measure on $G$ and $\hat f(\lambda)$ is an operator.
If we choose a basis $(\mathbf e_i)_{i=1}^{\textrm{dim}(V^\lambda)}$ for $V^\lambda$ (i.e., the vector space that $U^\lambda$ acts on), then we can compute the $i,j$-th component of $\hat f(\lambda)$ as

<p>
\[\hat f(\lambda)_{ij} = \int_G f(g) \left[U^\lambda(g)^{\dagger}\right]_{ij} dg.
\]
</p>

The <span class=accented>inverse Fourier transform</span> becomes

<p>
\[
    f(g) =  \sum_{\lambda \in \hat G} \textrm{dim}(V^\lambda) \left(\sum_{i,j} \hat f(\lambda) _{ji}U^\lambda(g)_{ij}\right).
    \]
    </p>

The inverse Fourier transform hinges on the important Peter-Weyl theorem.

Any representation of the group yields a corresponding representation of the Lie algebra:

$$
u^\lambda(X) \coloneqq \frac{d}{dt}U^\lambda\left(\exp(tX)\right)\bigg\vert_{t=0}.
$$

This object gives a commutative diagram for the actions of the left-invariant vector fields on $f$:

$$
\widehat{X^L f}(\lambda) = -u^\lambda(X)\hat f(\lambda),
$$

$$
\widehat{X^R f}(\lambda) = -\hat f(\lambda)u^\lambda(X).
$$

Other classical results, like the Parseval/Plancheral identity and the convolution theorem hold, but the convolution is generally non-commutative.

<!-- Since a Lie algebra homomorphism shoud preserve the bracket,

$$
\widehat{[X^L, Y^L] f}(\lambda) = ...
$$ -->

### The Fourier Transform of $SE(2)$

Let $(\theta, \mathbf t) \in SE(2)$.
The IUR of $SE(2)$ acts on the $L^2$ space of functions on the circle. Letting $\phi \in S^1 \cong SO(2)$ and $\zeta\in L^2(S^1)$, we define

<p>
\[
\left[U^\lambda 
\big((\theta, \mathbf t)\big) \zeta\right](\phi)\coloneqq e^{-i \lambda \hspace{1pt}(\hspace{1pt}t^1\cos \phi \hspace{1pt}+\hspace{1pt} t^2 \sin \phi)} \zeta(\phi - \theta).
\]
</p>

The space $\hat G$ is identified with $\mathbb R_{> 0}$ and the Fourier transform looks identical to the compact case. However, the inverse Fourier transform given above doesn't make sense since $V^\lambda$ is infinite-dimensional. Rather, we have

<p>
\[
    \begin{align}
f(g) &= \int_0^\infty \bigg(\sum_{i,j\in \mathbb Z} \hat f(\lambda) _{ji}U^\lambda(g)_{ij}\bigg) \lambda d\lambda.
\end{align}
\]
</p>

To find the component-wise description of the $SE(2)$ Fourier transform, consider the basis $(e^{ik\phi})_{k\in \mathbb Z}$, and let $\left[U^\lambda(g)\right]\_{ij} = \langle e^{ij\phi}, U^\lambda(g)e^{i\phi}\rangle$. The Fourier transform then becomes (see Chirikjian & Kyatkin, Sec. 11.2)

<p>
\[
    \begin{align}
\hat f_{mn}(\lambda) = &\int_{\mathbb R^2} \int_0^{2\pi} \int_0^{2\pi} f(\theta, \mathbf t) e^{in\phi} \nonumber
\\&e^{i \lambda \hspace{1pt}(\hspace{1pt}t^1\cos \phi \hspace{1pt}+\hspace{1pt} t^2 \sin \phi)}e^{-im(\phi - \theta)} \hspace{1pt}d\phi \hspace{1pt}d\theta \hspace{1pt}d t^1 dt^2.
\end{align}
\]
</p>

### Can we use FFT here?

Interchanging the order of integration, we can first do the computation

<p>
\[
    \begin{align*}
\int_{\mathbb R^2} f(\theta, \mathbf t) 
e^{i \lambda \hspace{1pt}(\hspace{1pt}t^1\cos \phi \hspace{1pt}+\hspace{1pt} t^2 \sin \phi)} d t^1 dt^2 \mapsto g(\theta, \phi)
\end{align*}
\]
</p>

since this is exactly the kind of product integral handled by the $2$-dimensional FFT.
