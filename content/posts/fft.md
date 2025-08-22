---
title: "Harmonic Analysis"
date: 2024-12-12T13:02:50+05:30
draft: false
---

The <span class=accented>Fourier transform</span> in $\mathbb R^n$ maps a complex-valued function $f:\mathbb R^n \rightarrow \mathbb C$ to a function of its [Pontryagin dual](https://en.wikipedia.org/wiki/Pontryagin_duality) space (which is in this case also $\mathbb R^n$), $\ \hat f:\mathbb R^n \rightarrow \mathbb C$, given by

$$
\begin{align*}
\hat f&(\boldsymbol \omega) \\&\coloneqq \int_{\mathbb R^n} f(\mathbf x) e^{-i\hspace{1pt} 2\pi \langle \boldsymbol \omega, \mathbf x\rangle} d\mathbf x\\
&= \int_{\mathbb R}\cdots\int_{\mathbb R} f(\mathbf x) \left(e^{-i \hspace{1pt}2\pi \omega^1 x^1}\cdots e^{-i \hspace{1pt}2\pi \omega^n x^n}\right) dx^1 \cdots dx^n\\
&= \cdots \left(\int_{\mathbb R}\left(\int_{\mathbb R} f(\mathbf x) e^{-i\hspace{1pt}2\pi \omega^1 x^1}dx^1 \right) e^{-i\hspace{1pt}2\pi \omega^2 x^2} dx^2 \right)\cdots 
\end{align*}
$$

That is, it performs the Fourier transform (FT) along each dimension, in succession. On compact quotients of $\mathbb R^n$, like $\mathbb T^n \cong \mathbb R^n/\mathbb Z^n$ (where each $\mathbb T\cong S^1$ is the one-dimensional [torus](https://en.wikipedia.org/wiki/Torus)), this becomes a [Fourier series](/posts/fourier).

## Discretization & Computation

Since we know that the $n$-dimensional FT is really just the one-dimensional FT iterated, let's restrict to the latter. Consider a function $f: \mathbb R \rightarrow \mathbb C$ that has been sampled on a regularly-spaced <span class=accented>lattice</span> in $\mathbb R$, i.e., a set of points $(x_j)_{j\in \mathbb Z}$ with $\Delta \coloneqq(x_j - x_{j-1})$ denoting the "sampling period". For simplicity, let $x_0 = 0$ so that $x_j = j \Delta$.
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

$$
    \begin{align*}
\tilde f(\omega + \tfrac{1}{\Delta}) &= \sum_{j\in \mathbb Z} f(x_j) e^{-i\hspace{1pt}2\pi \left(\omega + \tfrac{1}{\Delta} \right)j\Delta} \Delta\\
&= \sum_{j\in \mathbb Z} f(x_j) e^{-i\hspace{1pt}2\pi \omega j \Delta} \Delta
    \\
    &= \tilde f(\omega),
    \end{align*}
$$

showing that $\tilde f$ is periodic with period $\tfrac{1}{\Delta}$. The transform $f \mapsto \tilde f$ is called the [Discrete-Time Fourier Transform](https://en.wikipedia.org/wiki/Discrete-time_Fourier_transform) (DTFT). The periodicity of $\tilde f$ introduces limits in the inverse transform.

If we have only a finite number of samples $(x_i)_{i=0}^{N-1}$, then we obtain the (rather confusingly named) [Discrete Fourier Transform (DFT)](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Definition). To do this, we assume that the samples are periodic with period $N$; either this periodicity is due to the underlying periodicity of $f$, or we naively let the function be periodic outside $[0, N\Delta] \subseteq \mathbb Z$ because we do not care about the behavior of $f$ outside of this domain. In either case,

$$
    \begin{align}
\tilde f(\omega) &= \sum_{j\in \mathbb Z} f(x_j) e^{-i\hspace{1pt}2\pi \omega j \Delta} \Delta \\
&= \sum_{k\in \mathbb Z}\sum_{j=0}^{N-1} f(x_j) e^{-i\hspace{1pt}2\pi \omega (k N + j) \Delta} \Delta\\
&= \sum_{j=0}^{N-1} f(x_j) \left(\sum_{k\in \mathbb Z}e^{-i\hspace{1pt}2\pi \omega k N  \Delta}\right) e^{-i\hspace{1pt}2\pi \omega j \Delta}\Delta
\end{align}
$$

Using the (rather mysterious) [Poisson summation formula](/posts/fourier#the-poisson-summation-formula), we get

$$
    \begin{align}
\tilde f(\omega) 
&= \sum_{j=0}^{N-1} f(x_j) \left(2\pi \sum_{k\in \mathbb Z} \delta(\omega N \Delta + k) \right) e^{-i\hspace{1pt}2\pi  \omega j \Delta}\Delta
\end{align}
$$

Thus, the DTFT of a periodic sequence is non-zero precisely when $\omega N \Delta$ is an integer, i.e., $\omega = \ell/N\Delta$ for some $\ell \in\mathbb Z$. Since 

$$\tilde f\left(\frac{\ell + N}{N\Delta}\right) = \tilde f\left(\frac{\ell}{N\Delta} + \frac{1}{\Delta}\right) = \tilde f\left(\frac{\ell}{N\Delta}\right),$$

it is $N$-periodic in the Fourier domain; we only need to compute $N$ coefficients to realize this transform. In summary, the DFT can be thought of as "the DTFT of a finite sequence of samples", as computed under the assumption that the function is periodic outside the domain of the observed samples. In turn, the DTFT is simply a discretization of the FT. I present this table from [Wikipedia](https://en.wikipedia.org/wiki/Harmonic_analysis#Fourier_analysis):

| Time/Spatial Domain         | Frequency Domain         | Transform Name                      |
|-----------------------------|----------------------------|-------------------------------------|
| Discrete / Periodic         | Discrete / Periodic        | Discrete Fourier Transform (DFT)    |
| Continuous / Periodic       | Discrete / Aperiodic       | Fourier Series                      |
| Discrete / Aperiodic        | Continuous / Periodic      | Discrete-Time Fourier Transform (DTFT) |
| Continuous / Aperiodic      | Continuous / Aperiodic     | Fourier Transform (FT)              |

Finally, the [Fast Fourier Transform (FFT)](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Definition) is just a way to compute the DFT efficiently by exploiting the underlying redundancy of the computations. MATLAB has [a function](https://www.mathworks.com/help/matlab/ref/fftn.html) for computing the $n$-dimensional FFT, whose documentation mentions that this is mathematically just the one-dimensional FFT iterated.

## The Compact, Non-Abelian Case

So we know how the FT works on locally compact (which essentially means noncompact) abelian groups.
Now, the theory of Pontryagin duality breaks down on non-abelian groups.[^extension] We can nonetheless ask whether a function $f:G \rightarrow \mathbb C$
may be transformed, without loss of information, into another function $\hat f: \hat G \rightarrow \mathbb C$, where $\hat G$ is some sort of a *dual space*. The answer is yes, but the details are intricate.

[^extension]: An [extension](https://en.wikipedia.org/wiki/Tannaka%E2%80%93Krein_duality) of it does exist for the compact non-abelian case. Locally compact non-abelian groups (like $SE(n)$) are out of the question.

Instead of things like $e^{-i \omega x}$, one needs to introduce the so-called <span class=accented>irreducible unitary representations</span> (IURs) of $G$ (in the abelian case, these are called *characters* and constitute a group). A <span class=accented>representation</span> $U:G \rightarrow GL(V)$ is a group homomorphism from $G$ to the invertible linear operators on some vector space $V$. It is said to be <span class=accented>unitary</span> if ($V$ comes with an inner product, and) $U(g)$ is a unitary operator for all $g \in G$. We won't worry about what *irreducible* means, here, but it is a crucial ingredient in this theory. Note that $U(g^{-1}) = U(g)^{-1} = U(g)^{\dagger}$. For instance, $e^{i\omega x}$ is an IUR of $\mathbb R$, whose complex conjugate is $e^{-i\omega x}$. For $SU(2)$, the IURs act on homogeneous polynomials (which can be given a vector space structure). A subset of the $SU(2)$ IURs become the IURs for $SO(3)$ (see *Unitary Representations* by Mitsuo Sugiora, Thm. 7.1).

The dual space $\hat G$ is the space of all (equivalence classes of) IURs of $G$ (the details are outside of our scope). Let's say that the equivalence classes of IURs can be parameterized by some $\lambda$, so that $\big(\hspace{1pt} U^\lambda \mathrel\vert \lambda \in \hat G \big)$ represents all the distinct IURs (i.e., does not double-count any that are equivalent). The <span class=accented>Fourier transform</span> of $f$ (square-integrable function on $G$) is then given by[^ref]

$$\hat f(\lambda) = \int_G f(g) U^\lambda(g^{-1}) dg= \int_G f(g) \left(U^\lambda(g)\right)^{\dagger} dg,$$

[^ref]: See *A Course an Abstract Harmonic Analysis* by Folland (Sec. 4.2) or Chirikjian and Kyatkin (Sec. 8.3.2).

where $dg$ is the Haar measure on $G$ and $\hat f(\lambda)$ is an operator.
If we choose a basis $(\mathbf e_i)_{i=1}^{\textrm{dim}(V^\lambda)}$ for $V^\lambda$ (i.e., the vector space that $U^\lambda$ acts on), then we can compute the $(i,j)^{th}$ component of $\hat f(\lambda)$ as

$$\hat f(\lambda)_{ij} = \int_G f(g) \left[\left(U^\lambda(g)\right)^{\dagger}\right]_{ij} dg.
$$

The <span class=accented>inverse Fourier transform</span> (which hinges on the Peter-Weyl theorem) is given by (Thm. 8.1 of Sugiura)

$$
\begin{align}
    f(g) &=  \sum_{\lambda \in \hat G} \textrm{dim}(V^\lambda) \left(\sum_{i,j=1}^{\textrm{dim}(V^\lambda)} \hat f(\lambda) _{ji}U^\lambda(g)_{ij}\right)\\
    &=  \sum_{\lambda \in \hat G} \textrm{dim}(V^\lambda) \,\mathrm{Trace}\left( \hat f(\lambda)U^\lambda(g)\right).
    \end{align}
$$

In the case of $SO(3)$, the IURs $U^\lambda(g)$ are the Wigner $D$-matrices, $\lambda$ ranges over the nonnegative integers, and $\textrm{dim}(V^\lambda) = 2\lambda + 1$.
As in the case of the classical Fourier transform, compactness of the original domain implies that the IUR-space (i.e., frequency domain) is discrete.

Any representation of the group yields a corresponding representation of the Lie algebra:

$$
u^\lambda(X) \coloneqq \frac{d}{dt}U^\lambda\left(\exp(tX)\right)\bigg\vert_{t=0}.
$$

This object gives a commutative diagram for the actions of the left-invariant vector fields (LIVFs) on $f$. If $X^L$ is the LIVF generated by $X\in \mathfrak g$, then

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

## The Locally Compact, Non-Abelian Case

The theory gets more complicated here, and the literature sparse. The IURs are parametrized by the positive real numbers (i.e., $\lambda >0$). As we are no longer on a compact domain, the space of (equivalence classes of) IURs is continuous.

The IURs of $SE(2)$ act on the $L^2$ space of functions on the circle; or rather, we will think of these as functions on $SO(2)$. Letting $\phi \in  SO(2)$ a point and $\zeta\in L^2(SO(2))$ a function on the circle, respectively, we define

$$
\left[U^\lambda 
(g) \zeta\right](\phi)\coloneqq e^{-i \lambda \hspace{1pt}(\hspace{1pt}{\mathbf t}_x\cos \phi \hspace{1pt}+\hspace{1pt} {\mathbf t}_y \sin \phi)} \zeta(\phi - \theta)
$$

 where $g\coloneq(\theta, \mathbf t) \in SE(2)$ is the element being represented. Here, $U^\lambda(g) \zeta$ represents the action of $U^\lambda(g)$ on $\zeta$, whose result is another function on $SO(2)$. With these definitions, the <span class=accented>Fourier transform</span> of $SE(2)$ looks identical to the one in the compact case. To find the component-wise description of the transform, consider the basis $(e^{ik\phi})_{k\in \mathbb Z}$ for functions on the circle (with the circle identified with $\mathbb R/2\pi\mathbb Z$), and let $\left[U^\lambda(g)\right]_{mn} = \langle e^{im\phi}, U^\lambda(g)e^{in\phi}\rangle$. The $SE(2)$ Fourier transform then becomes (see Chirikjian & Kyatkin, Sec. 11.2)
$$
    \begin{align}
\hat f_{mn}(\lambda) = &\int_{\mathbb R^2} \int_0^{2\pi} \int_0^{2\pi} f(\theta, \mathbf t) e^{in\phi} \nonumber
\\&e^{i \lambda \hspace{1pt}(\hspace{1pt}{\mathbf t}_x\cos \phi \hspace{1pt}+\hspace{1pt} {\mathbf t}_y \sin \phi)}e^{-im(\phi - \theta)} \hspace{1pt}d\phi \hspace{1pt}d\theta \hspace{1pt}d {\mathbf t}_x d{\mathbf t}_y.
\end{align}
$$
 
 However, the <span class=accented>inverse Fourier transform</span> given above doesn't make sense since $V^\lambda$ is infinite-dimensional. Rather, we have

$$
    \begin{align}
f(g) &= \int_0^\infty \left(\sum_{i,j\in \mathbb Z} \hat f(\lambda) _{ji}U^\lambda(g)_{ij}\right) \lambda\, d\lambda\\
 &= \int_0^\infty \mathrm{Trace}\big(\hat f(\lambda)U^\lambda(g)\big) \lambda\, d\lambda.
\end{align}
$$

When I first saw this, I wondered if the extra $\lambda$ in "$\lambda\,d\lambda$" was a typo!


In the $SE(3)$ case, the IURs act on functions on the sphere, which can be expanded in the basis of *spherical harmonics*. We incur a `$\lambda^2 d\lambda$' term in the inverse transform. Rather than repeating the details, I recommend the tutorial article *GS Chirikjian, Degenerate Diffusions and Harmonic Analysis on SE(3): A Tutorial (2015)* written by my postdoc advisor.

<!-- ### Can we use FFT here?

Interchanging the order of integration, we can first do the computation

$$
    \begin{align*}
\int_{\mathbb R^2} f(\theta, \mathbf t) 
e^{i \lambda \hspace{1pt}(\hspace{1pt}{\mathbf t}_x\cos \phi \hspace{1pt}+\hspace{1pt} {\mathbf t}_y \sin \phi)} d {\mathbf t}_x d{\mathbf t}_y \mapsto g(\theta, \phi)
\end{align*}
$$

since this is exactly the kind of product integral handled by the $2$-dimensional FFT. -->
