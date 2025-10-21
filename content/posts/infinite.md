---
title: "An Invitation to Infinite Dimensions"
date: 2025-09-01T16:16:40-04:00
draft: true
tags: ["Linear Algebra"]
---

Most students' first time seeing an infinite-dimensional space is when they learn about the [Fourier transform](/posts/harmonic-analysis). Specifically, the <span>inverse Fourier transform</span> can be viewed as the expansion of a vector (in this case, a function) in a particular choice of basis, with the Fourier coefficients playing the role of the components of that vector in our basis. So, infinite-dimensional spaces are in some sense quite familiar. Yet, I always hesitate to play around with them because I do not know how (and moreover, whether!) the theorems that I know from finite-dimensional linear algebra can be extended to the infinite-dimensional setting.

## Finite and Countable Dimensions

The passage from finite to countable dimensions is easy enough. Let $V$ be an $n$-dimensional vector space, and $\lbrace e_i \rbrace_{i=1}^n$ a basis for it. We can express a vector $v\in V$ as $\sum_{i=1}^n v^i e_i$. We now take $V$ to be the space $L^2(S^1)$ to be the space of functions on the circle. Wait, what?

[Fourier analysis](https://en.wikipedia.org/wiki/Hilbert_space#Fourier_analysis)

The idea of change of basis also works in infinite dimensions. Functions on $S^1$ can be decomposed in terms of [wavelets](https://en.wikipedia.org/wiki/Wavelet) or bump functions instead of the trigonometric functions.
The [spherical harmonics](https://en.wikipedia.org/wiki/Spherical_harmonics) are similarly an orthonormal basis for the space $L^2(S^2)$ (square-integrable functions on the sphere); also countably infinite.