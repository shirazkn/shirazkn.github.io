---
title: "Lie Groups: Construction and Geometry"
date: 2024-01-24T14:20:59-05:00
ShowToc: true
TocOpen: false
draft: false
tags: ["Differential Geometry"]
---

There are multiple ways to construct new groups from old ones. For instance, the semidirect product $SO(3) \ltimes \mathbb R^3$ is the Special Euclidean group $SE(3)$, which is composed of all the rigid transformations of $\mathbb R^3$ (minus reflections). Here, I provide an intuition for how these constructions work. I will also go over some of the additional structures that can be imposed on Lie groups, paving the path towards doing differential geometry and calculus on Lie groups. While the word *geometry* implies the presence of an inner product/Riemannian metric, the word *calculus* hints at the possibility of differentiation and integration on Lie groups.

---

# Quotients

## Coset Spaces

Let $G$ be a Lie group having the operation $\odot$, and $H\leq G$ a subgroup of it. The <span class=accented>left cosets of $H$</span> in $G$ refer to the subsets of $G$ of the form

<p>
\[
    \begin{align}
    g\odot H = \lbrace g \odot h\ \vert\ h\in H \rbrace  \subseteq G
   \end{align}
\]
</p>

where $g\in G$. An important property of these subsets is that they're disjoint, in the sense that 

<p>
\[
    \begin{align}
    \textrm{either }\  &\left( g_1 \odot H \right) \cap \left( g_2 \odot H \right) = \emptyset \nonumber \\ &\text{or } \ \ g_1 \odot H = g_2 \odot H.
    \end{align}
\]
</p>

In general, the objects $\left\lbrace g\odot H\ \vert\ g\in G\right\rbrace$ do not form a group; they are merely a topological space called a <span class=accented>coset space</span>, written as $G/H$. I find this interpretation of a coset space very unmotivated. To me, a better way to think about $G/H$ is as the topological quotient space, $G/\sim_H$, constructed as follows.

Let $S$ be some topological space and $\sim$ an [equivalence relation](https://en.wikipedia.org/wiki/Equivalence_relation) on the elements of $S$. The (topological) <span class=accented>quotient space</span> $S/\sim$ is the set of equivalence classes of $S$ under $\sim$. In other words, $S/\sim$ is the space obtained by *gluing together* all the points in $S$ that are equivalent to each other:

<p>
\[
    \begin{align}
    [s]_\sim &= \lbrace s' \in S\ \vert\ s' \sim s \rbrace
    \end{align}
    \]
</p>

$S/\sim$ is the set of all such (distinct) equivalence classes.
We say that $s_0\in S$ is a *representative* of the equivalence class $[s_0]_\sim$. 
It's easy to see that the equivalence classes satisfy a property similar to <span class=accented>(2)</span>. In particular, 

<p>
\[
    \begin{align}
    s_1,s_2\in [s]_\sim &\iff [s_1]_\sim=[s_2]_\sim \\
    &\iff s_1 \sim s_2
    \end{align}
    \]
    </p>

A corresponding 'quotient topology' can be inherited by $S/\sim$ from $S$ (that's what makes this a *topological* quotient), but we need not get into the details of that right now. 

A special type of equivalence relation, $\sim_H$, is one that is given by the action of some group $H$ on $S$. Let $H$ act on $S$ as $h(s)\in S$, then $[s]_{\sim_H} $ is defined as the orbit of $s$ under $H$:

<p>
\[
    \begin{align}
    s_1, s_2 \in [s]_{\sim_H} &\iff \exists h\in H:\ s_1 = h(s_2)
    \end{align}
    \]
</p> 

$S/\sim_H$ is called an <span class=accented>orbit space</span>.

If we replace $S$ by a Lie group $G$, we get (at least in terms of the notation) the concept of a coset space, $G/\sim_H$. As mentioned earlier, $G/\sim_H$ need not constitute a group (i.e., we will not necessarily define a group operation between the equivalence classes), so it should suffice to think about it topologically. Let $H$ *act* on the Lie group $G$ by right multiplication, i.e., $h(g) = g\odot h$. Then, the orbit space $G/\sim_H$ is the set of all left cosets of $H$ in $G$, which is precisely the left coset space, $G/H$. Thus,

<p>
\[
    \begin{align}
    g_1, g_2 \in [g]_{\sim_H} &\iff \exists h\in H:\ g_1 = g_2 \odot h 
    \end{align}
    \]
</p> 

or more concisely,

<p>
\[
    \begin{align}
    g_1, g_2 \in [g]_{\sim_H}  &\iff g_2^{-1} \odot g_1 \in H.
    \end{align}
    \]
</p> 

It can be shown that this characterization of a coset space works just as well as the one in <span class=accented>(1)</span> and <span class=accented>(2)</span>.

## Homogenous Spaces

While $G/H$ need not have a group operation associated with it, it is possible to let $G$ act on $G/H$ by left multiplication, i.e., $g\odot [g^\prime]_{\sim_H} = [g\odot g^\prime]_{\sim_H}$. Since this action can be shown to be transitive, $G/H$ is a [homogeneous space](https://en.wikipedia.org/wiki/Homogeneous_space). The stabilizer of $[e]_{\sim_H}\in G/H$ is $H$, which is to say that $H$ is the subgroup of actions in $G$ that act trivially (by the identity map) on $[e]_{\sim_H}$. 

Conversely, given a homogenous space $X$ on which a group $G$ acts, we can construct a coset space by choosing a distinguished point $x\in X$. Letting $H$ denote the stabilizer of $x$ in $G$, $X$ is shown to be isomorphic to $G/H$. Thus, a homogenous space is obtained after we (i) equip a coset space of a Lie group with the appropriate action, and (ii)
"<i>forget</i>" the identity coset $[e]_{\sim_H}$ of $G/H$. The last point is similar to how an [affine space](https://en.wikipedia.org/wiki/Affine_space) is obtained after we forget the origin of $\mathbb R^n$. Another way of stating the above is that there is no distinguished point in a homogenous space, so the identity coset should be treated the same as any other. 
<!-- These are subtle differences between homogenous spaces and coset spaces, though the two objects are topologically identical. -->

<!-- When $G/H$ is connected, it is also what's called a [Klein geometry](https://en.wikipedia.org/wiki/Klein_geometry). --> 

## Quotient Groups

The quotient of topological spaces is distinct from the quotient of groups, for the same reason as why topological homomorphisms (i.e., continuous maps) are different from Lie group homomorphisms. While $G/H$ is always a topological quotient space (in the sense of $G/\sim_H$), it is a <span class=accented>quotient group</span> when $H$ is a normal subgroup of $G$ -- written as $H \trianglelefteq G$. In other words, the fact that $H$ happens to be a normal subgroup enables us to come up with a well-defined group operation on $G/H$.

By the defining property of a normal subgroup, we have that $g\odot H \odot g^{-1}= H$ for all $g\in G$ (i.e., $H$ is invariant under conjugation). The group operation $\star$ of $G/H$ is then given by

<p>
\[
    \begin{align}
    \left[ g_1 \odot H \right] \star \left[ g_2 \odot H \right] = \left[ (g_1 \odot g_2) \odot H\right].
    \end{align}
    \]
</p> 

The fact that $H$ is normal makes this definition independent of the choice of representatives, $g_1$ and $g_2$. 

An example of a quotient group is $\mathbb R^2/\mathbb Z^2$, where $\mathbb Z^2$ is the integer lattice in $\mathbb R^2$ considered as a group under addition. Topologically, $\mathbb R^2/\mathbb Z^2$ is a torus, and can be used to model for instance the repeating pattern of a crystal structure or a tesselation. Another example is $SO(3)/SO(2)$, which is topologically a $2$-sphere (i.e., the surface of a ball in $\mathbb R^3$). Notice that the subgroup of rotations that stabilize a given point on the sphere is isomorphic to $SO(2)$.

---

# Products


## Direct Products

The <span class=accented>direct product</span> of two groups $(H, \overset{H}{\odot})$ and $(K, \overset{K}{\odot})$ is the set of ordered pairs $H \times K$ with the group operation 

$$(h_1, k_1) \overset{H\times K}{\odot} (h_2, k_2) = (h_1 \overset{H}{\odot} h_2, k_1 \overset{K}{\odot} k_2).$$

This can be an uninteresting construction, however, since it doesn't intertwine the group operations of $H$ and $K$ in any meaningful way. The group $\mathbb R^2 = \mathbb R \times \mathbb R$ is the direct product of two copies of $\mathbb R$ (where each group operation is assumed to be the vector addition.) The group $SO(2) \times SO(2) \cong \mathbb R^2/\mathbb Z^2$ may be used to describe (topologically) the configuration space of a robotic arm with a hinge. In the case of matrix Lie groups, a direct product is represented by block diagonal matrices containing a block from each constituent group.

<!-- An example of a direct product is $O(n) \cong SO(n) \times \lbrace +I, -I \rbrace$, where the latter group keeps track of the reflections (i.e., the determinant of the matrix).  -->

<!-- Another example is $GL(n, \mathbb R) \cong SL(n, \mathbb R) \times \mathbb R^\times$. -->

## Inner Semi-Direct Products
The <span class=accented>inner semi-direct product</span> is a way of expressing a group $G$ as the product of two of its subgroups.
Let

<p>
\[
   N,H \leq G, \quad N \trianglelefteq G
\]
</p>

Moreover, we require that <span class=accented>$NH=G$</span> and <span class=accented>$H \cap N = \lbrace e \rbrace$</span>, i.e., the subgroups 'span' $G$ and are (as sets) complements of each other in $G$. If the preceding statements hold, then $G$ is the <span class=accented>inner semi-direct product</span> of $H$ acting on $N$, written as $G = N \rtimes H$ (the triangle helps us remember that $N$ is normal). The group operation $\star$ is given by

<p>
\[
    \begin{align}
    (n_1, h_1) \star (n_2, h_2) = \big(n_1 ( h_1  n_2  h_1^{-1} ),h_1  h_2\big)
    \end{align}    
\]
</p>

where $h_1 h_2$ is a short-hand for $h_1 \odot h_2$, and $\star$ is the newly-defined group operation.

[This video](https://www.youtube.com/watch?v=Pat5Qsmrdaw&t=716s) does a commendable job of explaining the motivation behind this definition -- the gist of it is as follows.
Recall that $NH=G$. It can be shown with some effort that the map $\phi: N \times H \rightarrow G$ defined by $\phi(n,h) = n h$ is a bijection of sets. This motivates us to go a little further and see if we can turn $\phi$ into a group isomorphism.
Now, observe that

<p>
\[
    \begin{align}
    \phi\big((n_1, h_1) \star (n_2, h_2)\big) &= \phi\big(n_1 ( h_1  n_2  h_1^{-1} ),h_1  h_2\big) \nonumber
    \\
    &= n_1 ( h_1  n_2  h_1^{-1} ) h_1  h_2 \nonumber\\
    &= n_1 h_1 n_2 h_2 \nonumber\\
    &= \phi(n_1, h_1) \phi(n_2, h_2)
    \end{align}    
\]
</p>

This shows that $\phi$, together with the operation $\star$ defined as above, is actually an isomorphism of groups (i.e., it preserves the group operation, and is bijective as a map between the underlying sets).
So, it is enough to remember that $\star$ should be defined in a way that the $h_1^{-1}h_1$ in '$n_1 ( h_1  n_2  h_1^{-1} ) h_1  h_2$' should cancel out. Lastly, note that $N$ needs to be a normal subgroup so that $ h_1  n_2  h_1^{-1}$ is indeed in $N$.

<aside class=aside-center>
The direct product of sets is not the same as the direct product of groups.
In the definition of $\phi$, we used '$N \times H$' to denote the set-theoretic product of $N$ and $H$. We did not prescribe a group operation on '$N \times H$', and we certainly did not impose the direct-product group operation on it. To reiterate, $N \rtimes H$ is the group given by the set of elements '$N \times H$' along with the group operation $\star$ as defined above.
</aside>

## Outer Semi-Direct Products
The <span class=accented>outer semi-direct product</span> follows by observing that the preceding definition can be generalized to the case where $H$ and $N$ are not subgroups of some common group. Here, the group $G$ is not given to us to begin with -- it is *obtained* as a result of performing the semi-direct product construction. 

To define an outer semi-direct product, we require an action $\Phi_h(\cdot):N \rightarrow N$ for each element $h\in H$ such that $\Phi_h(\cdot)$ is a group automorphism of $N$. For instance, observe that if $H,N \leq G$ and $N\trianglelefteq G$, then the choice of the action $\Phi_h(n) \coloneqq  h n h^{-1}$ will make the outer semi-direct product coincide with the inner semi-direct product (i.e., the latter is a special case of the former). In the more general setting where $H$ and $N$ are <i>only</i> related to each other via actions of the form $\Phi_h(n)$, the group operation $\star$ is given by

<p>
\[
    \begin{align}
    (n_1, h_1) \star (n_2, h_2) = \big(n_1 \Phi_{h_1}(n_2),h_1  h_2\big)
    \end{align}
\]
</p>

Letting $G = N \rtimes H$ as above, we have that $H \cong G/N$ (also see [group extension](#group-extension) below). We say that $\Phi_h(\cdot)$ <i>twists</i> the group multiplication; a trivial twist of $\Phi_h(n)=n$ reduces the semi-direct product to a direct product.

 <!-- Note that '$G/H$' is not necessarily a group, it is a coset space. -->

<b class=accented>Example 1:</b> $SE(3) \cong \mathbb R^3 \rtimes SO(3)$, where the action of $SO(3)$ on $\mathbb R^3$ is given by $\Phi_R(p) = Rp$. Thus,

<p>
\[
    \begin{align}
    (p_1, R_1) \star (p_2, R_2) = \big(p_1 + R_1p_2,R_1  R_2\big)
    \end{align}
    \]
</p> 

where the $+$ comes from the group operation of $\mathbb R^3$, the matrix-vector multiplication comes from $\Phi_R$, and the matrix-matrix multiplication comes from $SO(3)$.
Remember that the group that the triangle points towards (i.e., $\mathbb R^3$) plays the role of the normal subgroup, whereas the other group ($SO(3)$) acts on the former via automorphisms.

<b class=accented>Example 2:</b> $GL(n;\mathbb R) \cong SL(n;\mathbb R) \rtimes \mathbb R^\times$<br>
It's not too hard to see that these groups should be related to each other as above. The elements of $SL(n;\mathbb R)$ are determinant-one matrices, and the group $\mathbb R^\times$ scales the determinant up and down to recover the remaining matrices of $GL(n;\mathbb R)$. However, why is this not the same as $SL(n;\mathbb R) \times \mathbb R^\times$? We should try to answer this question, so that the distinction between direct and semidirect products becomes clear to us.

Any direct product should have a projection onto either of its factors, similar to how one is able to extract the $\textrm{x}$ and $\textrm{y}$ coordinates of a vector in $\mathbb R^2$.
When $n$ is odd, we have the following projection from $GL(n;\mathbb R)$ to $SL(n;\mathbb R)$:

<p>
\[
    (A) \mapsto \frac{A}{\big[\textrm{det}(A)\big]^{1/n}}
    \]
    </p>

since

$$
\textrm{det}\left(\frac{A}{\big[\textrm{det}(A)\big]^{1/n}}\right) = \frac{\textrm{det}(A)}{[\textrm{det}(A)]^{n/n}} =1.
$$

This would not work if $n$ were even, however, since $\big[\textrm{det}(A)\big]^{1/n}$ may not have a real value in these cases[^multivalued]. On the other hand, the semi-direct product does not require that there be a projection from $GL(n;\mathbb R)$ to $SL(n;\mathbb R)$ to begin with.

[^multivalued]: Note that $f(x) = x^{1/n}$ is a multi-valued function. Since it is an $n^{th}$ degree polynomial, it will have exactly $n$ (not necessarily distinct) complex roots.

So, $GL(n;\mathbb R) \cong SL(n;\mathbb R) \rtimes \mathbb R^\times$ always, and $GL(n;\mathbb R) \cong SL(n;\mathbb R) \times \mathbb R^\times$ when $n$ is odd, which is the content of Problem 7-21 of <a href=https://sites.math.washington.edu//~lee/Books/ISM/ class=accented>Lee's book</a> (also see the [errata](https://sites.math.washington.edu//~lee/Books/ISM/errata.pdf)).  We will come back to this example in the context of group extensions, below.

<b class=accented>Example 3:</b> $O(n) \cong SO(n) \rtimes O(1)$, which is also an example from Lee's book. Note that $O(1)$ is simply a group of the form $\lbrace 1, -1 \rbrace$. As before, we can also express this as a direct product when $n$ is odd.

## Group Extensions

Given a homomorphism $A\rightarrow B$ between objects $A$ and $B$ of some type, the kernel of the homomorphism is the set of elements of $A$ that map to the identity of $B$. For example, the kernel of (the linear transformation corresponding to) a matrix is its null space. It can be shown quite easily that a group homomorphism $f:G\rightarrow G^\prime$ should map the identity of $G$ to the identity of $G^\prime$, so $\ker(f)$ will at least contain the identity element of $G$.

The following sequence of group homomorphisms is an example of a [short exact sequence](https://en.wikipedia.org/wiki/Short_exact_sequence), in which the image of each homomorphism happens to be the kernel of the next homomorphism:

<p>
\[
   1 \rightarrow N \overset{\iota}{\rightarrow} G \overset{\pi}{\rightarrow} H \rightarrow 1
\]
</p>

Here, $G$ is said to be an <span class=accented>extension</span> of $H$ by $N$, and $1=\lbrace e\rbrace$ is the trivial one-element group. It's quite remarkable how much this succinct expression says about the relationships between $N$, $G$, and $H$. Firstly, $1$ maps to the identity of $N$ (since group homomorphisms preserve identities), and the same occurs on the right end of the sequence. We know that $\iota{(N)}$ is a normal subgroup of $G$ by the [first isomorphism theorem of Noether](https://en.wikipedia.org/wiki/Isomorphism_theorems). The first isomorphism theorem also says that the quotient $G/\iota{(N)}$ is isomorphic to $H$.

In the typical mathematical notation, $\iota$ denotes an <span class=accented>inclusion</span> and $\pi$ a <span class=accented>projection</span>. An inclusion maps a subset of a set injectively (though in all likelihood, not surjectively) into the parent set. A similar definition follows for the inclusion of a subspace onto a vector space, a topological subspace into its ambient space, and so on. A projection is something we've seen before in the context of a [fiber bundle](/posts/vector-fields/#tangentcotangent-bundles).
This suggests that $G\cong N\times H$ will always satisfy such a short exact sequence, with $\pi$ defined quite literally as a projection. 

Then arises the question of when $G$, if given as a group extension, is the semi-direct product of $H$ acting on $N$. Since $G$ need not have a projection onto $N$ in a semi-direct product, so we certainly don't need to have a morphism $N \leftarrow G$. Instead, what characterizes a semi-direct product precisely is the existence of a group homomorphism $\sigma: H \rightarrow G$, called a <span class=accented>section</span> or a [splitting](https://ncatlab.org/nlab/show/split+monomorphism), such that $\pi \circ \sigma=\textit{Id}$ (the identity map). This is in part because we can then define the action $\Phi_h(n)$ as $\sigma(h) n \sigma(h)^{-1}$ via the conjugations in $G$, giving us everything we need to construct the group operation.

<b class=accented>Example 2</b> <span class=accented>(Revisited)</span><b class=accented>:<br></b> We have the following short exact sequence:

<p>
\[
    1 \rightarrow SL(n;\mathbb R) \overset{\iota}{\rightarrow} GL(n;\mathbb R) \overset{\pi}{\rightarrow} \mathbb R^\times \rightarrow 1
\]
</p>

To check that this is a valid short exact sequence, we need the image of $\iota$ to be the kernel of $\pi$. Let $\iota$ be the inclusion map and $\pi=\textrm{det}(\ \cdot\ )$, then,
the kernel of $\pi$ is the set of matrices with determinant $1$, which is precisely $SL(n; \mathbb R)$. Thus, we already know that $\mathbb R^\times \cong GL(n;\mathbb R)/SL(n;\mathbb R)$ by the isomorphism theorem. To check that $GL(n;\mathbb R) \cong SL(n;\mathbb R) \rtimes \mathbb R^\times$, we need to find a section $\sigma: \mathbb R^\times \rightarrow GL(n;\mathbb R)$ such that $\pi \circ \sigma=\textit{Id}$. 
Letting 

<p>\[
    \sigma(\lambda) = \begin{bmatrix} \lambda & 0 & \cdots & 0 \\ 0 & 1 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 1 \end{bmatrix}\]</p>

completes the argument. 

Note that $\sigma \circ \pi \neq \textit{Id}$. This is what differentiates a section/splitting from an inverse, and prevents $GL(n;\mathbb R)$ and $\mathbb R^\times$ from being isomorphic (which they're clearly not). Also, $\pi$ and $\sigma$ do not constitute a bijection, which is one of the requirements of a group isomorphism.

--- 

# Geometry

## Metrics

Suppose that we are given (or choose) an inner product on $T_eG$, the tangent space at the identity of $G$ (which is also the vector space underlying $\mathfrak g$). We denote this as $\langle \tilde X, \tilde Y \rangle_e$ for $\tilde X, \tilde Y \in T_e G$. We can extend this metric to obtain a <span class=accented>left-invariant metric</span> on the entire Lie group $G$, as follows:

<p>
\[
    \langle X_g, Y_g \rangle_g \coloneqq \langle (\mathcal L_{g^{-1}*}) X_g,\ (\mathcal L_{g^{-1}*}) Y_g \rangle_e
    \]
    </p>

The reason this is called left-invariant is because[^source]

<p>
\[
    \langle \mathcal L_{h*} X_g, \mathcal L_{h*} Y_g \rangle _{hg} 
    = \langle X_g, Y_g \rangle _g.
\]
</p>

A <span class=accented>bi-invariant metric</span> is one that is simultaneously left- and right-invariant. The following Lemmas from [a paper by Milnor](https://core.ac.uk/download/pdf/82428733.pdf) characterize the Lie groups that admit bi-invariant metrics:


<p class=equation-like>
<span class=print>
<b>Lemma 7.1</b> A left-invariant metric on $\small{G}$ is also right invariant if and only if, for each $\small{g\in G}$, $\small{\textrm{Ad}}_g$ is an isometry of the inner product on $\small{\mathfrak g}$ [that generates said left-invariant metric].
</span>
</p>

This is also Proposition 3.12 of Lee's [book](https://link.springer.com/book/10.1007/978-3-319-91755-9) on Riemannian Manifolds.
It states that $\textrm{Ad}_g$ are given by $O(n)$ matrices acting on $\mathfrak g$.

<p class=equation-like>
<span class=print>
<b>Lemma 7.2</b> A left invariant metric on a connected Lie group is also right invariant if and only if $\small{\textrm{ad}_X}$ is skew-adjoint for every $\small{X\in\ }\mathfrak g$.
</span>
</p>

This follows as a consequence of Lemma 7.1, since $\mathfrak o(n)$ are precisely the skew-symmetric matrices. The next result is the most striking of the three, and immediately gives us examples of Lie groups that admit bi-invariant metrics:

[^source]: This property makes the right-invariant vector fields on $G$ examples of [Killing vector fields](https://en.wikipedia.org/wiki/Killing_vector_field) with respect to the left-invariant metric -- this is because [left-invariant flows are given by right-multiplication](/posts/lie-groups/#the-flows-of-mathfrak-xmathcal-lg), and vice versa. Also see [this](https://math.stackexchange.com/questions/2288619/misconception-about-geodesics-and-killing-fields-on-lie-groups).

<p class=equation-like>
<span class=print>
<b>Lemma 7.5</b> A connected Lie group admits a bi-invariant metric if and only if it is isomorphic to the direct product of a compact group and a commutative group.
</span>
</p>

As a corollary, every compact Lie group (including [closed and bounded](https://en.wikipedia.org/wiki/Heine%E2%80%93Borel_theorem) matrix Lie groups like $SO(n)$) admits a bi-invariant metric. While $SO(n) \times \mathbb R^n$ admits a bi-invariant metric, $SE(n) \cong SO(n) \ltimes \mathbb R^n$ does not. 
(Nevertheless, $SE(n)$ has the next best thing: a bi-invariant measure.) 

An interesting property of a Lie group that admits a bi-invariant metric is that its one-parameter subgroups are also geodesic (i.e., shortest-distance) paths of the metric.

<!-- <span class=accented><b>Example 1</b> (Revisited)<b>:</b></span><br>
Let's actually compute the metric of $SE(3) \cong \mathbb R^3 \rtimes SO(3)$. -->

## Measures

While metrics help assign values to the lengths of tangent vectors (and by extension, to curves), measures assign values to subsets. In classical calculus, the expression $\int_{\mathbb R} f(x) dx$ refers to integration with respect to a specific, canonical choice of a measure -- the Lebesgue measure. The Lebesgue measure is uniquely determined (up to a scaling factor) by the fact that it should be translation invariant, i.e., $\mu([0,1]) = \mu ([1,2])$, and a few other properties that are viewed as being *natural* to the structure of $\mathbb R^n$. It turns out that there is a canonical measure on Lie groups as well, called the (left) <span class=accented>Haar measure</span>, that satisfies $\mu_G(gA) = \mu_G(A)$ for all $g\in G$ and $A\subset G$, where

$$gA \coloneqq \lbrace ga\ \vert\ a\in A \rbrace.$$

The Lebesgue measure is a special case of the Haar measure on $\mathbb R^n$; the latter generalizes what we mean by *translation* to include any group operation. Like the Lebesgue measure, the left Haar measure can be shown to be unique up to scaling.
In a compact group, a unique Haar measure can be found by normalizing the scaling factor to $1$ so that $\int_G d\mu_G=\mu(G)=1$. If $\mu_G$ is a left Haar measure and $g\in G$, then $\tilde \mu^{(g)}_G \coloneqq \mu_G\circ \mathcal R_{g}$ is also a left Haar measure, since 

$$\tilde \mu^{(g)}_G(hA) = \mu_G(hAg) = \mu_G(Ag) = \tilde \mu^{(g)}_G(A)$$

for all $h\in G$. But since the left Haar measure is unique up to scalar multiplication, it must be the case that $\tilde \mu^{(g)}_G = \Delta (g) \mu_G$ where $\Delta (g)$ is a scalar-valued function that only depends on $g$. This is called the <span class=accented>modular function</span> of $G$ -- once computed, it is independent of the choice of the Haar measure $\mu_G$ that is used to compute it. It relates the left Haar measure to the right Haar measure. A lot of the properties and implications of $\Delta(\ \cdot\ )$ follow from showing that it is a group homomorphism from $G$ to $\mathbb R^\times_{>0}$.

<!-- ## Unimodularity and Bi-invariance -->

A Lie group is said to be <span class=accented>unimodular</span> *iff* its left Haar measure is also a right Haar measure, i.e., it is also right-invariant. Equivalently, a group is unimodular *iff* its modular function is $\Delta(g)=1$ for all $g\in G$.
[Milnor](https://core.ac.uk/download/pdf/82428733.pdf) once again saves us from needing to check this condition explicitly:


<p class=equation-like>
<span class=print><b>Lemma 6.1</b> A Lie group is unimodular if and only if the linear transformation $\textrm{Ad}_g$ has determinant $\pm 1$ for every $g\in G$.<br>
</p>

The absolute value of this determinant [is precisely the modular function](https://www.math.toronto.edu/mein/teaching/LectureNotes/lie.pdf), $\Delta(g)$. Recall or verify that $\lvert\det(\ \cdot\ )\rvert$ is a Lie group homomorphism from $GL(n; \mathbb R)$ to $\mathbb R^\times_{>0}$, the multiplicative group of positive real numbers.

<p class=equation-like>
<span class=print><b>Lemma 6.3</b> A connected Lie group is unimodular if and only if the linear transformation $\textrm{ad}_X$ has trace zero for every $X\in\mathfrak g$.<br>
</p>

Compare the relationship between these lemmas with the fact that $\textrm{det}(e^A) = e^{\textrm{tr}(A)}$ for any matrix $A$.

Note that for matrix Lie groups, $\textrm{ad}_X(Y)$ is always trace zero, since $\textrm{ad}_X(Y) = XY - YX$ and $\textrm{tr}(XY) = \textrm{tr}(YX)$. Lemma 6.3 is talking of the trace of $\textrm{ad}_X$ as a linear transformation on $\mathfrak g$ (as opposed to the trace of $\textrm{ad}_X(Y)$). Moreover, for computing the trace of $\textrm{ad}_X$ it does not matter what basis of $\mathfrak g$ we choose, since the trace is a property of the underlying linear transformation rather than of the matrix. As a special case of Lemma 6.3, the $\textrm{ad}_X$ matrices corresponding to a [nilpotent](https://en.wikipedia.org/wiki/Nilpotent_Lie_algebra) Lie algebra [are given by nilpotent matrices](https://en.wikipedia.org/wiki/Engel%27s_theorem), which have trace zero. Thus, every nilpotent Lie group is unimodular. Moreover, compact Lie groups are unimodular because $\Delta(g)$ is a homomorphism into the non-compact group $\mathbb R^\times_{>0}$, whereas the only compact subgroup of $\mathbb R^\times_{>0}$ is $\lbrace 1 \rbrace$.

Bi-invariant Haar measures are incredibly useful because they offer a way to integrate on Lie groups (as well as to define probability densities, Fourier transforms, etc.) while retaining the intuitive and attractive properties of the Lebesgue integral:

<p>
\[
    \begin{align}
    \int_G f(g) d\mu_G(g) &= \int_G f(g^{-1}) d\mu_G(g) \nonumber\\
    &= \int_G f(hg) d\mu_G(g) \nonumber\\
    &= \int_G f(gh) d\mu_G(g) \nonumber
    \end{align}
    \]
</p> 

where $f:G\rightarrow \mathbb R$ is a function, and $g \mapsto hg$ is to be viewed as the analogue of translation in $\mathbb R^n$. By requiring $f$ to be compactly supported and/or an integrable function and normalizing it, one is able to define a probability density function on $G$.

---

In [the next post](/posts/lie-groups_calculus), I use the machinery developed in the book [Introduction to Smooth Manifolds](https://link.springer.com/book/10.1007/978-1-4419-9982-5) by John M. Lee to study the properties of Riemannian metrics and measures. If you would rather skip ahead to the actual calculations, 
I point you toward the books by [G.S. Chirikjian](https://link.springer.com/book/10.1007/978-0-8176-4944-9). It contains formulae for differentiation and integration on the (matrix) Lie groups that are commonly encountered in engineering applications.