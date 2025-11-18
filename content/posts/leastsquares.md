---
title: "The Unreasonable Effectiveness of '2' in Statistics"
date: 2023-04-09T12:20:39-04:00
tags: ["Probability", "Linear Algebra", "Optimization"]
draft: false
---

The title is a reference to [The Unreasonable Effectiveness of Mathematics in the Natural Sciences](https://web.njit.edu/~akansu/PAPERS/The%20Unreasonable%20Effectiveness%20of%20Mathematics%20(EP%20Wigner).pdf), a very popular paper by Eugene Wigner which explores how mathematics is <i>unreasonably</i> effective at not only explaining, but also predicting scientific phenomena. I had a similar question about the number $2$ which repeatedly shows up in engineering and science, specifically in the form of the $2$-norm of a vector, and seems surprisingly effective at doing what it's supposed to do. I asked my [Estimation Theory](https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/courseInfo?courseid=175&show=true&type=grad) instructor at Purdue why this was so, and he told me that I ask too many (but good) questions. I have since then accumulated a variety of answers for why the number $2$ is, in some sense, ✨special✨ During our journey through this post and the next, we will visit the central limit theorem, Gaussian distributions, and Euclidean geometry.

### $2$-Norms in Statistical Regression

Let me first elaborate on why I think $2$ shows up in engineering more often than it should. The first time I noticed this was while I was being taught least squares regression for the 100<sup>th</sup> time. Suppose we want to recover some vector $x\in \mathbb R^n$, but we are only able to observe (noisy) measurements of it, given by $y=\Phi x + \epsilon$, where $\Phi \in \mathbb R^{m\times n}$ is called the measurement matrix and $\epsilon \in \mathbb R^m$ is some unknown noise vector. Then, we usually try to solve the following <span class=accented>least squares</span> problem:
<p>\[
\min_{\tilde x} \|y-\Phi \tilde x\|_2
\]
</p>

and, well, it usually just works. We recover something close to $x$ and has desirable properties. But why we don't we ever consider a more general [$p$-norm](/posts/norms_metrics), $\lVert{}\cdot{}\rVert_p$ instead? 

<p>\[
\|x\|_p \coloneqq \left(\sum_i |x_i|^p\right)^{\frac{1}{p}}
\]</p>

Well, we do indeed consider other norms sometimes. The $1$-norm is the next most commonly used, and it is called the 'absolute deviation' of the error, leading to the [least absolute deviations](https://en.wikipedia.org/wiki/Least_absolute_deviations) estimator. But the odds are, unless you're a statistician you've never heard of this estimator. Why's that?

Maybe the answer lies in the [central limit theorem (CLT)](https://en.wikipedia.org/wiki/Central_limit_theorem) and the [Gaussian distribution](https://en.wikipedia.org/wiki/Multivariate_normal_distribution). The CLT says that whenever a large number of independent random variables are summed, their distribution is approximately Gaussian. The Gaussian distribution indeed has a (weighted version of) the $2$-norm sitting inside its exponent. Suppose the noise vector $\epsilon$ in our least squares problem was distributed according to a <span class=accented>multivariate Gaussian distribution</span> with a zero mean and the covariance matrix $\Sigma \in \mathbb R^{m \times m}$, then its probability density function is
<p>
\[f_\epsilon(\zeta)=\frac{1}{\sqrt{(2 \pi)^m \det{(\Sigma)}}} \exp\left(-\tfrac{1}{2}\zeta^T\Sigma^{-1}\zeta\right)
\]</p>

Setting $\Sigma=\sigma I$, i.e., assuming that the error vector is <i>isotropic</i> (has identical statistical properties in every direction), gives us in the exponent $\zeta^T \zeta = \lVert \zeta\rVert_2^2$. 
When we want to obtain a <span class=accented>maximum likelihood</span> estimate of $x$, maximizing a function such as $f_\epsilon(\zeta)$ amounts to minimizing the term in the exponent, which is $\lVert \zeta\rVert_2^2$. There it is again, the mysterious least squares, now formulated as a maximum likelihood estimation problem!

Of course, this is because we assumed $\epsilon$ was Gaussian. If we had instead assumed $\epsilon$ to have a multivariate <span class=accented>Laplace distribution</span>, then we would encounter the 1-norm. The 1-norm has some advantages such as being robust against outliers in the data, as well as being better suited for high-dimensional regression problems. There are both geometric and probabilistic ways of comparing the 1-norm (least absolute deviations) with the 2-norm (least squares). The geometric way looks at the effects of the 1 and 2-norms on the data, whereas the probabilistic way contrasts the assumptions of Laplace vs. Gaussian noise.

But we mentioned that the CLT is on team Gaussian. It makes the remarkably universal claim that Gaussian noise <i>is</i> in fact the assumption we want to make. If we can figure out what's so special about Gaussians, then we would know exactly the conditions under which we can expect the $2$-norm to emerge as the reigning champion over other kinds of norms/metrics.

### The Effectiveness of Gaussians

#### Argument using <span class=accented>Convolutions</span>

For this section, let's only consider scalar-valued random variables. Gaussian distributions have some neat properties which can help explain their 'central' role in the CLT:

> Convolutions, products, and Fourier transforms of two Gaussians is Gaussian.

In particular, when we sum two independent random variables, the distribution of the sum is given by a <i>convolution</i> (which for our purposes is just some operation that takes two functions and gives another) of the individual distributions. The Gaussian distribution is essentially a <i>fixed point</i> of this iteration, so every other distribution tends to it. This is similar to how if you take a calculator, enter some number, and then mash the '$\sqrt{\   \ }$' button, then you eventually get stuck on the number $1$. This is (mostly) because $1$ is a fixed point of your iteration, $\sqrt{1} = 1$. Similarly, the (properly scaled) sum of $n$ random variables tends to a Gaussian random variable as $n\rightarrow \infty$, due to it being the fixed point of the convolution operation. This is a partial justification/intuition for why the sum of a large number of random variables has a Gaussian distribution -- the CLT.

The CLT works irrespective of what distributions these individual random variables have, they can even be different. It is a statistical sledgehammer that works in a wide range of settings (much like its close cousin, the law of large numbers).
For this reason, researchers and engineers often assume that the noise $\epsilon$ of our statistical regression problem is Gaussian; when we sample our measurements using our macroscopic equipment, at say a 100Hz frequency, we are looking at the summed up version of the microscopic non-Gaussian fluctuations that have added up to give a Gaussian random variable.

#### Argument using the <span class=accented>Taylor Series</span>
I like to think of the CLT as a <i>stepping stone</i> to the law of large numbers (LoLN). Given i.i.d. random variables $x_i$ with mean $\mu$ and some finite variance, let

<p>
\[ \hat \mu_n = \frac{1}{n}\sum_{i=1}^n x_i\]
</p>

Then the LoLN says that $\lim_{n\rightarrow \infty} (\hat \mu_n- \mu)$ equals $0$. We call $\hat \mu_n$ the sample mean. The CLT says something about what happens to $\hat \mu_n$ just before the LoLN kicks in. Notice that $\hat \mu_n$ is itself a random variable.
The CLT says that $\sqrt{n}(\hat \mu_n - \mu)$ becomes more and more Gaussian distributed as $n\rightarrow \infty$. 

When $n\gg0$, we are mutiplying a large, large number ($\sqrt{n}$) with a small number ($\hat \mu_n - \mu$). Think of this small number, $\hat \mu_n - \mu$, as a random variable that has its own distribution. Its distribution starts off looking like whatever, then as you keep increasing $n$ it closes in on the $y$-axis, looking more and more Gaussian (CLT). Eventually (as $n\rightarrow\infty$) it hugs the $y$-axis because now the only possible value for $\hat \mu_n - \mu$ is $0$ (LoLN).

What's interesting is that the number $2$ shows up in the proof of the CLT for the above reasons. Look at Wikipedia's [proof of the CLT](https://en.wikipedia.org/wiki/Central_limit_theorem) using characteristic functions. The proof uses the Taylor series approximation of the characteristic function of $\sqrt{n}(\hat \mu_n - \mu)$. The first term is a constant that corresponds to the LoLN (since $e^0=1$), the second term is a 'square' term which corresponds to the CLT. The higher order terms drop out faster than the leading order (square) term. Finally, the square term also drops out, leaving us with just the constant term. Once again, we see that the CLT kicks in just before the LoLN does, but in addition, we can also see why the asymptotic distribution has a 'square' in the numerator -- it comes from the leading order term of the Taylor series.

#### Argument using <span class=accented>Symmetry</span>

Let's assume that it was not the Gaussian, but in fact some probability density function (pdf) that looks like $f(\zeta) = C{}e^{-\tfrac{1}{2}\lVert\zeta\rVert_p^p}$ which was the limiting distribution in the CLT. Of course, we already know that the Gaussian has the parameter $p=2$, we are trying to figure out what might be so special about $p=2$. The reason for the minus sign being in the exponent is for $f(\zeta)$ to be integrable, so that $\int_{\mathbb R^n}f(\zeta)d\zeta=1$; it's still a pdf at the end of the day.

Since $g(x)=e^{x}$ is a strictly increasing function, given any $0\leq\delta\leq 1$, we can choose a corresponding $\tau\geq0$, such that

<p>\[
e^{-\|\zeta\|_p^p} \geq \delta\quad  \Leftrightarrow \quad \|\zeta\|_p^p \leq \tau
\]</p>

The inequality on the left gives the *level sets* or the 'horizontal slices' of the pdf. The inequality on the right is called the *[norm ball](/posts/balls)* corresponding to the $p$-norm. Thus, the shape of the norm ball characterizes the *shape* of the pdf $f(\zeta)$. Since in the CLT Gaussians play a "universal" role, one can argue that its level sets should be spherical -- perfectly symmetric. There is no reason that the distribution should favor one direction over the other, because independent random variables cannot *conspire* with each other to add up in a particular direction (especially when, as in the statement of the CLT, their distribution is arbitrary!).

And what do you know, $\lVert \zeta\rVert _p^p \leq \tau$ [is spherical](/posts/balls) when and *only* when $p=2$! The $2$-norm has [some more properties](/posts/norms_metrics) which are unique to it among all the other $p$-norms. As an aside, the spherical shape of Gaussians [is also where the $\pi$ in the normalization constant comes from](https://www.youtube.com/watch?v=cy8r7WSuT1I). This is a purely aesthetic argument which may or may not be in the spirit of mathematics depending on where you're coming from. Where I'm coming from, this was my favorite argument of the three!