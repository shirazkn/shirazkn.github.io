
## Lie Algebra Extension

I introduced short exact sequences (SESs) in my discussion of [semi-direct products](/posts/lie-groups_construction) of Lie groups. Specifically, we discussed the more general concept of a group extension. If you have read that post, then you might already know how to define a Lie algebra extension. It is also defined via an SES, but one consisting of *Lie algebras* and morphisms (i.e., structure-preserving maps) between them:

$$
\mathbf 0 \to \mathfrak h \to \mathfrak e \to \mathfrak g \to \mathbf 0
$$

where $\mathfrak e$ is called the <span class=accented>extension</span> of $\mathfrak g$ by $\mathfrak h$. The map $\mathfrak h \hookrightarrow \mathfrak e$ is the (injective) *inclusion* of $\mathfrak h$ into $\mathfrak e$, and the map $\mathfrak e \twoheadrightarrow \mathfrak g$ is the (surjective)[^2] *projection* of $\mathfrak e$ onto $\mathfrak g$. Since morphisms that preserve the Lie algebra structure should also preserve the vector space structure, we have that $\mathfrak e = \mathfrak h \oplus \mathfrak g$ as a vector space.[^1] So we have taken two Lie algebras $\mathfrak h$ and $\mathfrak g$ and combined them into a larger Lie algebra, $\mathfrak e$. 

But surely the Lie bracket on $\mathfrak e$ should satisfy additional properties (otherwise, we have done no better than to write down an SES involving vector spaces). What are these properties? Let's call the inclusion and projection maps $\iota$ and $\pi$, respectively. Since the morphisms are structure-preserving, we have

$$
\begin{align}
[\iota(H_1), \iota(H_2)] &= \iota([H_1, H_2])\\
\quad [\pi(X_1), \pi(X_2)] &= \pi([X_1, X_2])
\end{align}
$$

where $H_1, H_2 \in \mathfrak h$ and $X_1, X_2 \in \mathfrak e$. Now let $H,G \in \mathfrak e$ based on the vector space decomposition of $\mathfrak e$. We have

<!-- $$
\begin{align}
\Big[&\pi\big(\,\iota(H_1) + G_1\,\big),\ \pi\big(\,\iota(H_2) + G_2\,\big)\Big] \\
&= \pi\big([\iota(H_1) + G_1, \iota(H_2) + G_2]\big) \\
&= \pi\big(\iota([H_1, H_2]) + [G_1, G_2]\big)
\end{align}
$$ -->

$$
\begin{align}
\Big[\pi(H),  \pi(G)\Big] &= \pi\big([H, G]\big)
\end{align}
$$

But $\pi(H) = 0$ since $\pi$ is a projection onto $G$, which means that $\pi\big([H, G]\big)=0$, that is, $[H,G]\in \mathfrak h$. This means that $\mathfrak h$ is an <span class=accented>ideal</span> of $\mathfrak e$, i.e., $[\mathfrak h, \mathfrak e] \subseteq \mathfrak h$. Intuitively, $\mathfrak h$ "absorbs" the vectors that it is bracketed against.

[^1]: Recall that a *short exact sequence* is one where the image of each map is the kernel of the next. Using the first isomorphism theorem, we can show that $\mathfrak g \cong  \mathfrak e/\mathfrak h$. Because of the short exact sequence property, we also have that $\mathfrak h \cong \textrm{Im}(\hookrightarrow) = \textrm{Ker}(\twoheadrightarrow)$. Putting the pieces together, we see that $\mathfrak h$ and $\mathfrak g$ represent mutually exclusive parts of $\mathfrak e$.

[^2]: Actually, the injectivity and surjectivity follow automatically from the presence of the $\mathbf 0's$ on either end, combined with the requirement that this sequence be exact.

### Central Extension

A central extension of $\mathfrak{g}$ by $\mathfrak h$ is one where $\mathfrak h$ commutes with everything in $\mathfrak e$ under the Lie bracket of $\mathfrak e$, i.e., $[\mathfrak h, \mathfrak e] = 0$. Since $\mathfrak h$ commutes in particular with itself, this means that $\mathfrak h$ must be an Abelian (i.e., commutative) Lie algebra. 

A trivial example is as follows: let $(H, G)$ denote an arbitrary element of $\mathfrak e$, similar to how $(1, 3, 4)$ represents a vector in $\mathbb R^3$. Since $\mathfrak h$ should be Abelian, we let 

$$
\mathfrak h \coloneqq \lbrace k \cdot X \mid k \in \mathbb R \rbrace
$$

for some vector $X$, i.e., it's a one-dimensional Lie subalgebra of $\mathfrak e$. Define the Lie bracket on $\mathfrak e$ as

$$
\begin{align}
\big[(H_1, G_1), (H_2, G_2)\big] &\coloneqq \big([H_1, H_2], [G_1, G_2]\big)\\
 &= \big(0, [G_1, G_2]\big),
\end{align}
$$

that is, the product Lie bracket.
It is easy to see that elements of the form $(H, 0)$ commute with everything in $\mathfrak e$, so $\mathfrak e$ is a central extension of $\mathfrak g$ by $\mathfrak h$.