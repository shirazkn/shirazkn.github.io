---
title: "$SO(3)$"
date: 2024-06-07T11:27:55-04:00
draft: true
---

Here, I want to construct the Haar measure for $SO(3)$ and pull it back to the axis-angle parametrization of $SO(3)$. Let the basis for $\mathfrak{so}(3)$ be given by 

$$
\begin{align*}
E_1 &= \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix} \\
E_2 &= \begin{bmatrix} 0 & 0 & 1 \\ 0 & 0 & 0 \\ -1 & 0 & 0 \end{bmatrix} \\
E_3 &= \begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}
\end{align*}
$$

and the corresponding dual basis of $\mathfrak{so}(3)^*$ be given by $\lbrace\varepsilon^1, \varepsilon^2, \varepsilon^3\rbrace$, where we recall that $\varepsilon^i$ is like the `row vector' counterpart to $E_i$. In particular, $\varepsilon^i(E_j) = \delta_{ij}$. 

The Haar measure on $SO(3)$ is denoted by $\mu_{SO(3)}$. It is (up to scaling) simply the canonical Riemannian volume form on $SO(3)$ determined by the left-invariant metric on $SO(3)$:

$$
\mu_{SO(3)} = \frac{1}{(2\pi)^3}\varepsilon^1\wedge\varepsilon^2\wedge\varepsilon^3
$$


where we have added a factor of $\frac{1}{(2\pi)^3}$ to normalize the measure.