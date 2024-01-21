---
title: "The Lie Group-Lie Algebra Correspondence"
date: 2024-01-15T07:24:59-05:00
ShowToc: true
TocOpen: false
draft: false
---

A <span class=accented>topological group</span> is a set of elements $G$ that has both a group operation $\odot$ and a [topology](https://www.youtube.com/watch?v=62WNNkoRCLE). The group operation satisfies the usual axioms (same as [those of finite groups](https://youtu.be/g7L_r6zw4-c?si=Y2Zit5muzZrCciaQ)), and the presence of a topology lets us say things like 'the group is connected' and 'the group operation is continuous'. $G$ is called a <span class=accented>Lie group</span> if it is also a smooth manifold. The smooth structure of the manifold must be *compatible* with the group operation in the following sense: $\odot$ is differentiable with respect to either of its arguments [^1]. The compatibility of its constituent structures is what makes a Lie group so special, enabling it to capturing the essence of a [continuous symmetry](https://en.wikipedia.org/wiki/Noether's_theorem).

[^1]: More precisely, we test for the differentiability of $\odot$ in the product topology on $G \times G$.

A different (but closely related) mathematical object is the <span class=accented>Lie algebra</span>. A Lie algebra $\mathfrak v$ is a vector space equipped with an operation called the <span class=accented>Lie bracket</span>, $[\cdot, \cdot]: \mathfrak v \times \mathfrak v \to \mathfrak v$, that satisfies certain properties that parallel those of a 'cross product'. While a Lie algebra may exist in the absence of an associated Lie group, <span class=accented>every Lie group gives rise to a Lie algebra</span>[^2]. In other words, we can associate to each Lie group $G$ a corresponding Lie algebra, with the latter typically denoted as $\mathfrak g$ to emphasize its relationship to $G$. 
<!-- While the group operation $\odot$ of $G$ may not be commutative, the addition operation $+$ of $\mathfrak g$ is commutative by definition.  -->

Letting $e$ denote the identity element of $G$, we will see that $T_e G$ (the tangent space of $G$ at $e$), together with an appropriately defined bracket operation, is a natural candidate for $\mathfrak g$. Consider as an example $SO(2)$, the group of rotation matrices of $\mathbb R^2$ having determinant $1$, whose identity element $e$ is the identity matrix $I$. The tangent space $T_ISO(2)$ consists of the $2\times 2$ skew-symmetric matrices. Skew-symmetric matrices represent infinitesimally small rotations, since near the identity element of $SO(2)$ (i.e., the identity matrix), we have

<p>
\[
\begin{align} 
\theta \approx 0 \Rightarrow \begin{bmatrix}
\ \ \cos\theta & -\sin\theta\ \  \\
\ \ \sin\theta & \cos\theta
\end{bmatrix} 
\approx
I + 
\begin{bmatrix}
\ 0 & -\theta \ \\
\ \theta & 0
\end{bmatrix}
\end{align}
\]
</p>

Still, the above observation alone does not make it clear what the relationship between $SO(2)$ and $T_ISO(2)$ is. For starters, why should one expect infinitesimal rotations to be related in any way to arbitrary (large angle) rotations? What is the significance of the Lie bracket? 

[^2]: The converse holds if $G$ is [simply connected](https://en.wikipedia.org/wiki/Simply_connected_space) as a manifold (i.e., it has no holes). We say that the Lie group-Lie algebra correspondence is one-to-one in these cases. Note that the $SO(3)$ group is not simply connected; I highly recommend walking through the proof of this fact in$\ \mathrm{Sec.\ 1.3.4}\ $of Brian C. Hall's book.

This post is by no means meant to be an introduction to Lie groups; for that, I recommend the first few chapters of <a href=https://link.springer.com/book/10.1007/978-3-319-13467-3 class=accented>Brian C. Hall's book</a>. I will instead hurry us along to our main line of investigation -- understanding the <span class=accented>Lie group-Lie algebra correspondence</span>, pausing only to show you some pictures/diagrams that I had fun drawing. A bonus take away from this post will be a deeper understanding of the exponential map, one that unifies the exponentials of real numbers, complex numbers, and matrices.


<aside class=aside-center>
<b>Prerequisites:</b> Conceptual understanding of the <a href=/posts/differential-forms/#tangentcotangent-spaces class=accented>tangent spaces of a smooth manifold</a> and familiarity with the standard examples of matrix Lie groups, including $SO(n)$, $GL(n,\mathbb R)$ and $\mathbb R^n$.
</aside>

--- 

## Background

The details in this section may be [skipped](#invariant-vector-fields), but I suggest looking at the illustration below before moving on.

### Pushforwards

Given a smooth, parameterized curve $\gamma:\mathbb R \rightarrow G$, let $(U,h)$ be a chart of $G$ such that $\gamma (0)\in U$. Observe that $h\circ \gamma:\mathbb R\rightarrow \mathbb R^n$ can be differentiated in the usual way, and that
$\frac{d}{dt}\left[h\circ \gamma (t)\right]\big\vert_{t=0}$ is simply a vector in $\mathbb R^n$. All of the curves on $G$ that result in a given vector of $\mathbb R^n$ when differentiated as above represent the same <span class=accented>tangent vector</span>, i.e., a single element of the tangent space $T_{\gamma(0)}G$.

Let <span class=accented>$[$</span>$\gamma$<span class=accented>$]$</span> denote the tangent vector (or more precisely, the equivalence class) corresponding to the curve $\gamma$. We say that <span class=accented>$[$</span>$ h\circ \gamma$<span class=accented>$]$</span> is the <span class=accented>pushforward</span> of the tangent vector <span class=accented>$[$</span>$\gamma$<span class=accented>$]$</span> under the map $h$. More generally, if $f:\mathcal M \rightarrow \mathcal N$ is a smooth map between manifolds, then the <span class=accented>differential</span> of $f$ at $p\in \mathcal M$ is the linear operator that maps tangent vectors at $p$ to their pushforwards at $f (p)$:[^curve]

<p>
\[
    \begin{align}
    (f_*)_p:\ T_p \mathcal M &\rightarrow T_{f (p)} \mathcal N\\
    \mathbf v &\mapsto (f_*)_p \mathbf v \nonumber
    \end{align}
    \]
</p>

[^curve]: Typically, $\mathbf v $ is given to us in the local coordinates of the chart $(U,h)$, as $(h\_\*)\_p \mathbf v \in \mathbb R^n$.
One way to go about computing $(f\_\*)\_p \mathbf v$ is to pick any representative curve $\gamma$ such that $\frac{d}{dt}\left[h\circ \gamma (t)\right]\big\vert_{t=0} = (h\_\*)\_p \mathbf v$.
Thereafter, we have $(f\_\*)\_p \mathbf v$=<span class=accented>$[$</span>$f \circ \gamma$<span class=accented>$]$</span>. <br>
Yet another way to do this computation is to pick a chart $(U^\prime,h^\prime)$ at $f(p)$ and determine the Jacobian of $h^\prime \circ f \circ h^{-1}$ at $h(p)$.

In practice, $(f\_\*)\_p$ ends up looking something like the Jacobian of $f$ evaluated at $p$. The caveat is that a Jacobian (matrix) maps vectors in $\mathbb R^n$ to vectors in $\mathbb R^m$, whereas $(f\_\*)\_p$ does the more general job of mapping vectors in $T_p \mathcal M$ to vectors in $T_{f (p)} \mathcal N$.

Given $g\in G$, let $\mathcal L_g:G\rightarrow G$ denote <span class=accented>left-multiplication by $g$</span>, i.e., $\mathcal L_g(h) = g\odot h$ for all $h\in G$. Here's how a tangent vector at the identity $e\in G$ can be 'pushed forward' by the left-multiplication map $\mathcal L_g$:
<figure class=invertible style="max-width: 100%;">
<img src=/post-images/lie_groups/left-multiplication.png>
</figure>

where the curve passing through $g$ was obtained by composing $\gamma$ with $\mathcal L_g$. Since $T_eG$ is going to be identified[^ident] with $\mathfrak g$ (as a vector space), the above illustration is going to play a key role in the forthcoming discussion. It shows that $(\mathcal L_{g^{-1}*})\_g$$=(\mathcal L_{g\*})\_e ^{-1}$ will reduce a tangent vector at $g$ to an element of the Lie algebra.

[^ident]: The word *identified* is used here in the sense of 'made identical to'. I remember being amused when I first came across this usage of it, today I quite like how resolute it sounds.

By a reuse of notation, we can also 'push forward' entire vector fields (when $f$ is a diffeomorphism):

<p>
\[
    \begin{align}
    f_*:\ \mathfrak X (\mathcal M) &\rightarrow \mathfrak X (\mathcal N)\\
    X &\mapsto f_* X \nonumber
    \end{align}
    \]
</p>

where $\mathfrak X(\cdot)$ denotes the set of all smooth vector fields on a manifold. 

### Morphisms

Most (if not all) mathematical objects come with a distinctive *structure*; for topological spaces it is their topology/open sets, for vector spaces their vector addition and scalar multiplication operations, for finite groups the existence of inverses, and so on. Mappings between objects of the same type that preserve these structures are called <span class=accented>homomorphisms</span> (or in the jargon of category theory, simply morphisms). The homomorphisms between vector spaces are the *linear transformations* between them. Suppose $f:V\rightarrow W$ is a linear transformation, then

<p>
\[
    f(v_1 \overset{V}{+}v_2)=f(v_1)\overset{W}{+}f(v_2) \in W,
    \]
    </p>
    
which shows that the structure of the vector addition operation $\overset{V}{+}$ of $V$, has been *transported to* that of the $\overset{W}{+}$ operation of $W$. This suggests that homomorphisms (i.e., structure-preserving maps) may be paramount to the study of the underlying mathematical structure, which is indeed the case (see linear algebra). 



<!-- Homomorphisms between topological spaces are the *continuous maps*. Homomorphisms between sets are simply the *maps* or *functions* between them; as sets have significantly less structure than, say, topological spaces, functions between sets are not all that 'special' when compared to continuous maps. -->

If $A$ and $B$ are two objects of the same type and $f$ a homomorphism between them, we simply write

<p>
\[
\begin{array}{c}
A \overset{f}{\longrightarrow} B
\end{array}
\]
</p>

where the meaning of $f$ depends on which type of mathematical structure is being transported. A homomorphism for which there also exists an 'inverse homomorphism' $g:B \rightarrow A$, such that $f \circ g = g\circ f =\ $*the identity map*, is called an <span class=accented>isomorphism</span>. Isomorphisms between vector spaces are those linear transformations that can be represented as invertible matrices. Beware that neither word, homomorphism or isomorphism, should be uttered unless the structure in question is contextually obvious. Two objects are never simply isomorphic, they are *isomorphic as vector spaces*, or *isomorphic as topological spaces*, and so on.

A homomorphism between topological spaces is a *continuous map* between them. The word <span class=accented>homeomorphism</span>, rather confusingly, refers to an isomorphism (and *not* a homomorphism) between topological spaces; this piece of nomenclature is quite a tragedy. An isomorphism between smooth manifolds is a differentiable map with a differentiable inverse -- a <span class=accented>diffeomorphism</span>.

A <span class=accented>Lie group homomorphism</span> $\varphi$ is a map between two Lie groups that preserves both the group operation and the topology; i.e., it is simultaneously a group homomorphism and a continuous map. The best way to understand what a group homomorphism entails is through a <span class=accented>commutative diagram</span>:

<figure class=invertible style="max-width: 50%;">
<img src=/post-images/lie_groups/group-homomorphisms.png>
</figure>

We say that this diagram *commutes* if the two compositions of arrows (top-right and left-bottom, each of which results in $\searrow$) are in fact the same arrow:

<p>
\[
     \begin{align}
\mathcal L_{\varphi (g)}\circ \varphi = \varphi \circ \mathcal L_g
 \end{align}
\]
</p>
 where $\circ$ indicates the composition of functions.
Feeding an argument $\tilde g\in G$ on either side, we get

<p>
\[
    \begin{align}
\varphi (g) \overset{H}{\odot}\varphi(\tilde g) &= \varphi (g \overset{G}{\odot} \tilde g) \\
\end{align}
\]
</p>

where $\overset{G}{\odot}$ is the group operation in $G$ and $\overset{H}{\odot}$ is the group operation in $H$. This makes it (at least notationally) clear that $\varphi$ preserves the group structure, though one should work out the consequences of this definition; for instance, it can be shown that $\varphi$ should map the identity of $G$ to the identity of $H$. An example of a Lie group homomorphism is the determinant of a matrix, $\textrm {det}:GL(n;\mathbb R) \rightarrow \mathbb R^\times$, since

<p>
\[
    \begin{align}
    \textrm {det}(AB) = \textrm {det}(A) \textrm{det}(B)
    \end{align}
    \]
</p>

Here, $GL(n;\mathbb R)$ is the [general linear group](https://en.wikipedia.org/wiki/General_linear_group) consisting of $n\times n$ invertible matrices and $\mathbb R^\times$ is the [multiplicative group of real numbers](https://en.wikipedia.org/wiki/Multiplicative_group) (crucially, $0\notin \mathbb R^\times$). Observe that $\textrm {det}(I)=1$ as promised.

---

## Invariant Vector Fields

As I hinted at previously, the key to uncovering the Lie group-Lie algebra correspondence is to study the topological and group structures of $G$ *simultaneously*. How does one do this? A good starting point would be to specialize the curves and vector fields considered above (which are topological objects) to those special ones that also respect the group structure of $G$.

<aside class=aside-right>
A similar discussion holds for right-multiplication, but going down that path will yield the same Lie algebra, albeit with some sign changes.
</aside>
This brings us to a central object in the study of Lie groups, the space of left/right-invariant vector fields. A <span class=accented>left-invariant vector field</span> is one for which the vectors at two different points are related by the pushforward operator $\mathcal L_{g*}$ corresponding to left-multiplication by the group elements. More rigorously, a vector field $X\in \mathfrak X (G)$ is said to be left-invariant if the following diagram commutes:

<figure class=invertible style="max-width: 50%;">
<img src=/post-images/lie_groups/left-invariant.png>
</figure>

For example, we have for $h\in G$,

<p>
\[
    \begin{align}
     X \circ \mathcal L_g (h) = (\mathcal L_{g*})_h X(h)
    \end{align}
    \]
</p>

$=X(g\odot h)$. An important consequence of this definition is that just by knowing $X(e) \in T_e G$, we can determine the value of $X$ at all the other points, since $X(g) = (\mathcal L_{g*})\_e X(e)$. In fact, one can construct a left-invariant vector field by picking any vector $\tilde X \in T_eG$ and defining $X(g) \coloneqq (\mathcal L_{g*})\_e \tilde X$. Conversely, given a left-invariant vector field $X$, we can simply evaluate it at the identity $e$ to determine the $\tilde X$ that generated it. Thus, the space of left-invariant vector fields on $G$, written as <span class=accented>$\mathfrak X^{\mathcal L}(G)$</span>, is isomorphic to $T_eG$ as a vector space (the fact that $\mathfrak X^{\mathcal L}(G)$ can be given a vector space structure is for the reader to deduce). The word 'left-invariant' comes from the fact that $\mathcal L_{g*}X= X$.

A left-invariant vector field $X\in \mathfrak X^{\mathcal L}(G)$ is special because it represents 'water' flowing along the surface of $G$ in perfect concordance with the group structure of $G$. The fact that such an object can be related to $T_eG$ bodes well for the establishment of $T_eG$ as an object that *corresponds* to the Lie group $G$. However, some reflection will show that we need to do more work to recover the group structure of $G$ at $T_eG$. For starters, the group multiplication operation $\odot$ need not be commutative, whereas the vector addition operation $+$ in $T_eG$ is commutative by definition. This is where the Lie bracket comes in; it is a multiplication-like operation that can be imposed on $T_e G$ to in some sense 'measure the failure of commutativity' in $G$. We will revisit this point a little later.

## The Exponential Map

If the Lie algebra is to correspond to the Lie group, the elements of the Lie algebra should be somehow *associated* to the elements of the Lie group. How do we associate $\tilde X \in T_eG$ to a unique group element of $G$?
First, we extend $\tilde X$ to the unique left-invariant vector field $X$ that satisfies $X(g) = (\mathcal L_{g*})\_e \tilde X$. Thereafter -- and this is going to sound unbelievably simple -- we place a 'boat' at the identity $e$ and let it flow along the surface of $G$ in the direction of $X$ for exactly *one* unit of time! 

Let's unpack what that means. The boat is going to trace out a path/curve on $G$, which we denote by $\gamma :[0, 1] \rightarrow G$, such that $\gamma (0)=e$. At time $t\in[0,1]$, the boat's position is given by $\gamma(t)\in G$. Its velocity at time $t$ is given by $\gamma ^\prime(t)=X(\gamma(t))$. Thus, we require that

<p>
\[
    \begin{align}
    \gamma ^\prime(t) =  \big(\mathcal L_{\gamma(t)*}\big)_e \tilde X
    \end{align}
    \]
</p>

The equation above is a differential equation (or dynamical system) that can be solved to yield a solution (or trajectory) $\gamma (t)$. The solution is called an <span class=accented>integral curve</span> or a <span class=accented>flow</span> of $X$ starting at $e$. Of course, we can solve it by using the local charts of $G$ to (locally) reduce it to a system of ordinary differential equations in $\mathbb R^n$, and then 'stitching' the local solutions together to get the overall curve on $G$. Before I convince you that this can indeed be done, let's exercise prescience in making [the following definition](https://en.wikipedia.org/wiki/Exponential_map_(Lie_theory)):

<p>
\[
    \begin{align}
    \exp:\ T_e G &\rightarrow G\\
    \tilde X &\mapsto \gamma(1) \nonumber
    \end{align}
    \]
</p>

where $\gamma$ is the integral curve (or flow) that solves <span class=accented>$(8)$</span> for the given choice of $\tilde X$. Note that $\gamma ^\prime(0) = \tilde X$ is the initial velocity of the boat.

#### Example 1: $G=\mathbb R^\times$, the Multiplicative Group of Real Numbers

In this case, $\mathcal L_g$ and $(\mathcal L_{g*})_e$ reduce to the same operation -- multiplication of real numbers[^diff].
Equation <span class=accented>$(8)$</span> reduces to

<p>
\[
    \begin{align}
    \gamma ^\prime(t) =  \gamma(t) \tilde X
    \end{align}
    \]
</p>

where $\tilde X \in T_e\mathbb R^\times \cong \mathbb R$ and $e=1$ is the identity element (of multiplication). By seeking a power series solution (or better yet, through an informed guess), we get

[^diff]: This is true for any linear map when $G$ is a vector space; in particular, $L_g$ and $L_{g*}$ are given by the same matrix multiplication operation in matrix Lie groups. See Prop. 3.13 of <a href=https://link.springer.com/book/10.1007/978-1-4419-9982-5>Lee's book</a> (Second Edition).

<p>
\[
    \begin{align}
    \gamma(t) = 1 + t\tilde X + \frac{t^2}{2!}\tilde X^2 + \frac{t^3}{3!}\tilde X^3 + \cdots
    \end{align}
    \]
</p>

so that $\exp(\tilde X)=\gamma(1)$ is the usual exponential function that we've come to know and love. By the [uniqueness](https://en.wikipedia.org/wiki/Picard–Lindelöf_theorem) of the solution to an ODE, we have arrived at a well-defined definition for the exponential map in this case. 

<aside class=aside-center>
<b>Remark: </b> The group $\mathbb R^\times$ has a 'hole' at zero, so that our boat cannot flow to the negative real numbers. Consequently, $\exp$ only maps to the positive reals (i.e., it isn't surjective). Nevertheless, the exponential map is always diffeomorphic (and thus, invertible) near the identity element of $\mathfrak g$; this can be shown to hold for all Lie groups using the <a href=https://en.wikipedia.org/wiki/Inverse_function_theorem class=accented>inverse function theorem</a>.
</aside>

#### Example 2: $G=U(1) \cong SO(2)$, the Circle Group

$U(1)$ is the group of complex numbers of unit modulus, with the group operation $\odot$ being the multiplication of complex numbers. Since we have already seen how <span class=accented>$(8)$</span> can be solved, a visual depiction of the exponential map might be more gratifying:

<figure class=invertible style="max-width: 60%;">
<img src=/post-images/lie_groups/u1.png>
</figure>

Because we are able to visualize this Lie group as a (topological) subspace of $\mathbb R^2$, we can quite literally see the boat flowing along the surface of $G$ in the direction of $X$. Here, $X(e^{i\theta})=e^{i\theta}\tilde X$, so the left-invariant vector fields are generated by sliding $\tilde X$ along the circle without changing its length.

#### Example 3: $G=GL(n;\mathbb R)$, the Invertible Matrices

Equation <span class=accented>$(8)$</span> becomes

<p>
\[
    \begin{align}
    \gamma ^\prime(t) =  \gamma(t) \tilde X
    \end{align}
    \]
</p>

(Just like in $\mathbb R^\times$, matrix multiplication and its differential both reduce to the same operation [^diff].) The rest follows in the same way as in **Example 1**.

Going back to **Example 1**, notice that a large negative initial velocity at $1\in \mathbb R^\times$ sends the boat to a small positive number, but never to $0$. For an analogous reason, $\exp(\tilde X)$ is always an invertible matrix. As the determinant of $\gamma(t)$ should change smoothly during the boat's trajectory (and apparently it never hits the value $0$), we conclude that $\det(\exp(\tilde X))>0$. Thus, $\exp$ is once again not surjective.

[^diff]: This is true for any linear map when $G$ is a vector space; in particular, $L_g$ and $L_{g*}$ are given by the same matrix multiplication operation in matrix Lie groups. See Prop. 3.13 of <a href=https://link.springer.com/book/10.1007/978-1-4419-9982-5>Lee's book</a> (Second Edition).

#### Example 4: $G\cong \mathbb R$, the Shift Operators

The case for $G=\mathbb R$ with addition as the group operation seems rather uninteresting at first. Equation <span class=accented>$(8)$</span> becomes

<p>
\[
    \begin{align}
    \gamma ^\prime(t) =  \tilde X
    \end{align}
    \]
    </p>

since the differential of the addition operation leaves the vector $\tilde X\in T_0 \mathbb R$ unchanged (after identifying all of the tangent spaces of $\mathbb R$ with $\mathbb R$). Thus, $\gamma(t)=t\tilde X + C$. Since $\gamma(0)=0$, we have $C=0$ and $\gamma(t)=t\tilde X$. This makes $\exp(\tilde X) = \gamma(1)=\tilde X$; the boat has moved away from the origin for $1$ unit of time under constant velocity. The same is true for $\mathbb R^n$, and in fact for any vector space with vector addition as the group operation.

The above result becomes interesting when we consider a group isomorphism from $\mathbb R$ to the space of [shift operators](https://en.wikipedia.org/wiki/Shift_operator). Consider an entirely new group $G$, and let $S^{a} \in G$ be something that *operates* on functions of the form $f:\mathbb R \rightarrow \mathbb R$ by shifting them to the left (if ${a} >0$) or right (if ${a}<0$) by ${a}$ units:

<p>
\[
    \begin{align}
    (S^{a} f)(t) = f(t + {a})
    \end{align}
\]
</p>

where ${a} \in \mathbb R$. Clearly, $e=S^0$ is the identity element of $G$ and $S^a\circ S^{-a} = S^0$.
I omit the details here (to understand it, we need to understand the tangent vectors as [derivations](https://math.stackexchange.com/questions/1340503/tangent-space-as-derivations-exercise)), but a tangent vector in $T_{S^0}G$ is given by a differential operator of the form $\tau \frac{d}{dt}$,
where $\tau \in \mathbb R$. The exponential map is then given by

<p>
\[
    \begin{align}
    \exp\left(\tau \frac{d}{dt}\right) = S^\tau
    \end{align}
    \]
</p>

It cannot be understated just how remarkable the above result is. Letting the left-hand side of <span class=accented>$(15)$</span>
 operate on a function $f$ and evaluating the resulting function at $t_0$, we get

<p>
\[
    \begin{align}
    \left(\exp\left(\tau \frac{d}{dt}\right) f\right)(t_0)
    &=
        \left[\left( 1 + \tau \frac{d}{dt} + \frac{\tau^2}{2!} \frac{d^2}{dt^2} + \cdots \right)
         f\right](t_0)
        \end{align}
    \]
</p>

whereas on the right-hand side, we have $(S^\tau f )(t_0) =f(t_0+\tau)$. Thus,

<p>
\[
    \begin{align}
    f(t_0) + \tau \frac{df}{dt}(t_0) + \frac{\tau^2}{2!} \frac{d^2f}{dt^2}(t_0) + &\dots =f(t_0+\tau)
    \end{align}
    \]
<p>


which is nothing but the Taylor series expansion of $f$ at $t_0$! In a sense, the Taylor series expansion starts at $t_0$ and then 'slides along the graph of $f$' to obtain its value at the other points. 

<aside class=aside-center>
Control theorists should connect the above observations to <a href=https://en.wikipedia.org/wiki/Discretization class=accented>the discretization of a continuous-time state-space model</a> in the linear time-invariant case.
</aside>

#### Properties of $\exp$

We have skipped a lot of the standard results in Lie theory in order to get to the fun parts of this blog post, but the following properties of $\exp$ are worth mentioning:

- It is always *locally* invertible near the identity element $0\in \mathfrak g$.
- Given a choice of $\tilde X\in \mathfrak g$, $\gamma(t)=\exp (t \tilde X)$ is a [one-parameter subgroup](https://en.wikipedia.org/wiki/One-parameter_group) of $G$, i.e., a Lie group homomorphism from $\mathbb R$ to $G$. Consequently, $\exp\big((t_1+t_2) \tilde X\big)=\exp(t_1\tilde X) \exp (t_2 \tilde X)$, and $\exp(-\tilde X)=\exp (\tilde X)^{-1}$.
- $\exp(t\tilde X)$ represent geodesic paths passing through the identity of $G$ with respect to a particular choice of metric (namely, a bi-invariant Riemannian metric, [if one exists](https://en.wikipedia.org/wiki/Exponential_map_(Riemannian_geometry)#Relationships_to_exponential_maps_in_Lie_theory)) and the resulting Levi-Civita connection.

## The Flows of $\mathfrak X^{\mathcal L}(G)$

Before we proceed, we need to see how the one-parameter subgroups $\exp(t\tilde X)$ can be extended to *flows*. A flow of $X\in \mathfrak X(G)$ is a map $\Phi:\mathbb R \times G \rightarrow G$ such that

<p>
\[
    \begin{align}
    \Phi(0,g) = g \quad \text{and} \quad \frac{d}{ds}\Big\vert_{s=t} \Phi(s,g) = X\big(\Phi(t,g)\big)
    \end{align}
    \]
</p>

Notice that $\Phi(\cdot , e ) = \gamma(\cdot)$ as before, but now we're also permitted to specify the starting condition. In this more general setting, the flow map $\Phi$ is given by

<p>
\[
    \begin{align}
    \Phi(t,g) = \mathcal R_{\gamma(t)}(g)
    \end{align}
    \]
</p>

where $\gamma(t) = \exp(t\tilde X)$,
i.e., flows of left-invariant vector fields are given by right-multiplications, and vice versa. As a function of $t$, <span class=accented>$(19)$</span> is a trajectory that starts at $g\in G$ at $t=0$ and flows along the left-invariant vector field $X$ generated by $\tilde X$.
Why is that?

<p>
\[
    \begin{align}
    \frac{d}{ds}\Big\vert_{s=t} \Phi(s,g) &= \frac{d}{ds}\Big\vert_{s=t} \mathcal R_{\gamma(s)}(g)\\
    &= \frac{d}{ds}\Big\vert_{s=t}  \big(g \odot \gamma(s)\big)\\
    &= \frac{d}{ds}\Big\vert_{s=t}  \mathcal L_g \gamma(s)\\
    &= \big(\mathcal L_{g*}\big)_{\gamma(t)} \frac{d}{ds}\Big\vert_{s=t}  \gamma(s)\\
    \end{align}    
    \]
</p>

where we're attempting to exploit the left-invariance of $X$. Because $\gamma(t)$ solves <span class=accented>$(8)$</span>, we have

<p>
\[
     \begin{align}
    \frac{d}{ds}\Big\vert_{s=t} \Phi(s,g) &= \big(\mathcal L_{g*}\big)_{\gamma(t)} X\big(\gamma(t)\big)\quad \\
    &= X\big(g \odot \gamma(t)\big)\\
    &= X\big(\mathcal R_{\gamma(t)}(g)\big)\\
    &= X\big(\Phi(t,g)\big)
    \end{align}    
    \]
</p>

## Lie Bracket

The fact that $\exp (t \tilde X)$ is a one-parameter subgroup of $G$ means that the corresponding subgroup must be Abelian, i.e.,  $\exp (t_1 \tilde X)$ and $\exp (t_2 \tilde X)$ commute under $\odot$ even if $\odot$ was not commutative in $G$. For instance, the (non-trivial) one-parameter subgroups of $SO(3)$ are rotations about a fixed axis --
each of these is isomorphic to $SO(2)$, which is Abelian: 

$$R_1,R_2\in SO(2) \Rightarrow R_1 \odot R_2 = R_2 \odot R_1$$

This means that we still haven't captured the (potential) non-commutativity of $\odot$ at the Lie algebra.
To do this, we first need to understand [vector fields as derivations](https://math.stackexchange.com/questions/1340503/tangent-space-as-derivations-exercise). An operator $X:C^\infty(G) \rightarrow C^\infty(G)$ is called a *derivation* if it is linear and satisfies the Leibniz rule:

<p>
\[
    X(f_1\cdot f_2) = f_1\cdot X(f_2) + f_2\cdot X(f_1)
    \]
    </p>

with $f_1\cdot f_2$ indicating pointwise multiplication of $C^\infty(G)$ functions. Vector fields are derivations [by construction](/posts/differential-forms), though we haven't had to emphasize this aspect of them until now. When $X$ acts on a $C^\infty(G)$ function $f$, we will treat it as a derivation, but when $g \in G$, we will treat $X(g)$ as a tangent vector (which acts on [one-forms](/posts/differential-forms) instead).

For $X,Y\in \mathfrak X(G)$ and $f_1,f_2\in C^\infty(G)$, since $Y(f_1\cdot f_2)$ is again a $C^\infty(G)$ function, we can have $X$ act on it as follows:

<p>
\[
    \begin{align}
    X\big(Y(f_1\cdot f_2)\big) &= X\big(f_1\cdot Y(f_2) + f_2\cdot Y(f_1)\big)\\
    &= f_1 \cdot X\big(Y(f_2)\big) + X(f_1)\cdot Y(f_2) \nonumber \\&\quad + f_2\cdot X\big(Y(f_1)\big) + X(f_2)\cdot Y(f_1)\\
    \end{align}
    \]
</p>

which indicates that $X\big(Y(\ \cdot\ )\big)$ is not a derivation. If we instead define 

$$[X,Y]=X(Y(\ \cdot\ )) - Y(X(\ \cdot\ )),$$ 

then one has (using <span class=accented>$(29)$</span> and its X-Y interchanged version)

<p>
\[
\begin{align}
[X,Y](f_1\cdot f_2) &= f_1 \cdot X\big(Y(f_2)\big) + f_2\cdot X\big(Y(f_1)\big)\\
&\quad - f_1 \cdot Y\big(X(f_2)\big) - f_2\cdot Y\big(X(f_1)\big)
\\
&=f_1\cdot [X,Y](f_2) + f_2\cdot [X,Y](f_1)
\end{align}    
    \]
</p>

<aside class=aside-right>
A subtle, yet important point to note is that $X\big(Y(\ \cdot\ )\big)$ is not invariant under a change of coordinates, whereas $[X,Y]$ is. This is often the motivation for the definition of $[X,Y]$ that is given in tensor calculus textbooks.
</aside>

making $[X,Y]$ a derivation. One can show that $[X,Y]\in \mathfrak X(G)$. Following a similar line of reasoning, <span class=accented>the Lie bracket of left-invariant vector fields is a left-invariant vector field</span>. 
This takes a particularly useful form in matrix Lie groups:
due to each left-invariant vector field being uniquely determined by its value at the identity, we can identify the Lie bracket of left-invariant vector fields $X,Y\in\mathfrak X^{\mathcal L}(G)$ with the commutator of matrices:

<p>
\[
    [X,Y](e) = \tilde X \star \tilde Y - \tilde Y\star \tilde X = [\tilde X,\tilde Y]_{\star}
    \]
</p>

where I use $\star$ to make it explicit that we're relying on matrix multiplication; the $T_e G$ of a non-matrix Lie group does not necessarily come with a $\star$-like multiplication operation. When writing $[X,Y] (e)$, we are once again interpreting $[X,Y]$ as a vector field $G \rightarrow TG$ rather than a derivation.

<!-- With this identification, we have

<p>
\[
[X,Y](f)(e) = \big[\tilde X,\tilde Y\big]_{\star} f(e)
\]
</p> -->

Lastly, we should observe the connection of the Lie bracket to the <span class=accented>Lie derivative</span> between vector fields; namely, that they are one and the same. Letting $\Phi$ be the flow map corresponding to $X$, we have

<p>
\[
    \begin{align}
    [X,Y](g) &= \mathcal L_X Y(g) \\
    &= \lim_{\epsilon \rightarrow 0} \frac{\Big(\Phi(-\epsilon, \cdot\ )_* Y\Big)\big(\Phi(\epsilon,g)\big) - Y(g)}{\epsilon}\\
    &= \frac{d}{dt}\Big\vert_{t=0} \Big(\Phi(-t, \cdot\ )_* Y\Big)\big(\Phi(t, g )\big)
    \end{align}
    \]
</p>

$\mathcal L_X Y$ is defined such that the vectors being subtracted in the numerator are in the same tangent space.
In the very special case where $X,Y \in \mathcal X^{\mathcal L}(G)$, we have

<p>
\[
     \begin{align}
    [X,Y](g) &= \frac{d}{dt}\Big\vert_{t=0} \Big(\mathcal R_{\gamma(-t)*} Y\Big)\big(\mathcal R_{\gamma(t)}(g)\big)\\
    &= \frac{d}{dt}\Big\vert_{t=0} \Big(\mathcal R_{\gamma(-t)*} Y\Big)\big((g\odot \gamma(t))\big)\\
    &= \frac{d}{dt}\Big\vert_{t=0} \Big(\mathcal R_{\gamma(-t)*} \mathcal L_{g*} Y\Big)\big(\gamma(t)\big)\\
    &= \frac{d}{dt}\Big\vert_{t=0} \Big(\mathcal R_{\gamma(-t)*} \mathcal L_{g*} \mathcal L_{\gamma(t)*} Y\Big)\big(e\big)\\
    &=  \frac{d}{dt}\Big\vert_{t=0} \Big(\mathcal L_{g*}\textrm{Ad}_{\gamma(t)} \tilde Y\Big)
     \end{align}    
    \]
</p>

where $\gamma(t) = \Phi(t,e) = \exp(t\tilde X)$, and we used the fact that $\mathcal L\_{(\ \cdot\ )}$ always commutes with $\mathcal R\_{(\ \cdot\ )}$ (as they act from opposite directions).
In particular, 

<p>
\[
    \begin{align}
        [X,Y](e) = \frac{d}{dt}\Big\vert_{t=0} \Big(\textrm{Ad}_{\gamma(t)} \tilde Y\Big) = \textrm{ad}_{\tilde X} \tilde Y
    \end{align}    
\]
</p>

where $\textrm{Ad}\_{(\cdot)}$ and $\textrm{ad}\_{(\cdot)}$ are the adjoint representations of $G$ and $\mathfrak g$ (which I will assume you've seen before). 

---

## Representation Theory

A <span class=accented>representation</span> of $G$ is a Lie group homomorphism from $G$ to $GL(\mathfrak g)$, where the latter is the group of automorphisms of $\mathfrak g$ (as a vector space). A Lie group homomorphism need not be particularly instructive, however, since the map $g \mapsto e$ is also a homomorphism from $G$ to $\left\lbrace e\right\rbrace$. This is like multiplication by $0$ in a vector space -- it is a linear map, but a rather useless one. A representation is most useful when it is also [faithful](https://en.wikipedia.org/wiki/Faithful_representation), meaning that the corresponding Lie group homomorphism is injective/one-to-one.

Given a Lie group homomorphism $\varphi:G\rightarrow H$, it induces a corresponding Lie algebra homomorphism $\varphi_*:\mathfrak g \rightarrow \mathfrak h$ that makes the following diagram commute:

<figure class=invertible style="max-width: 50%;">
<img src=/post-images/lie_groups/representations.png>
</figure>

As implied through <span class=accented>$(41)$</span> and the choice of notation here, $\varphi_*$ is simply the differential of $\varphi$ at the identity element of $G$.
In particular, the adjoint representations $\textrm{Ad}$ and $\textrm{ad}$ are related to each other in this way (see Theorem 8.44 of Lee's book, 2<sup>nd</sup> edition). Specifically, $\textrm{ad}:\mathfrak g \rightarrow \mathfrak {gl}(\mathfrak g)$, where $\mathfrak {gl}(\mathfrak g)$ are the endomorphisms of $\mathfrak g$ (as a Lie algebra).

Either representation ($\textrm{Ad}/\textrm{ad}$) is uninteresting when $\odot$ is commutative, in which case conjugation reduces to the identity map ($g\odot h \odot g^{-1} = h$) and the Lie bracket of $\mathfrak g$ vanishes identically. However, they are indispensible tools for studying non-commutative groups. In what follows, we will demonstrate yet another line of investigation in which the adjoint representations arise as a measure of non-commutativity.

My [previous post](/posts/differential-forms#tangentcotangent-bundles) introduced the notion of a fiber bundle, of which the tangent bundle of $G$, $TG$, is an example. The following diagram shows that two bundles $(E_1, M, \pi_1, F)$ and $(E_2, M, \pi_2, F)$ over the same base space ($M$) and fiber ($F$) may be fundamentally different:

<figure class=invertible style="max-width: 100%;">
<img src=/post-images/lie_groups/trivial-bundles.png>
</figure>

Here, the existence of the homeomorphism $\varphi: E_1 \rightarrow M \times F$ shows that $E_1$ and $M\times F$ are *similar* in some sense, and the non-existence of one at $E_2$ shows that it is different from the others. For instance, $E_2$ has only a single, connected edge, whereas the cylindrical shapes have two (top and bottom) edges. Mentally, we can think of a homeomorphism between two spaces as the ability to morph one space (as if it were made of extremely malleable clay) into the other without cutting, gluing, or poking holes into it.

The bundle corresponding to $M\times F$ is called the <span class=accented>trivial bundle</span> over $M$ having the fiber $F$, and the homeomorphism $\varphi$ is called a <span class=accented>trivialization</span> of the bundle $(E_1, M, \pi_1, F)$. By virtue of the existence of $\varphi$, we will write $E_1 \cong M\times F$ (as fiber bundles).

The purpose of introducing the notion of a trivial bundle is that we will demonstrate the following fact: $TG \cong G \times \mathfrak g$. We can *trivialize* $TG$ in the following way; given a vector $X_g \in T_g G$, we know that $\mathcal L_{g^{-1}*} X_g$ is in $\mathfrak g$. Thus, define the following isomorphism between fiber bundles:

<p>
\[
    \begin{align}
    \mathcal L:\  TG &\rightarrow G \times \mathfrak g\\
    X_g &\mapsto (g, \mathcal L_{g^{-1}*} X_g) \nonumber
    \end{align}
    \]
</p>

The continuity of $\mathcal L_{g^{-1}*}$ makes the above a valid isomorphism of bundles. 
If $X\in \mathfrak X^{\mathcal L}(G)$ is a left-invariant vector field that is understood as a smooth section of $TG$, then $\mathcal L$ *flattens* the section, i.e., each tangent vector $X(g)$ is mapped to the same vector of $\mathfrak g$. We call $\mathcal L$ the <span class=accented>left-trivialization</span> of the tangent bundle.

Yet another trivialization is the following:

<p>
\[
     \begin{align}
    \mathcal R:\  TG &\rightarrow G \times \mathfrak g\\
    X_g &\mapsto (g, \mathcal R_{g^{-1}*} X_g) \nonumber
    \end{align}
\]

where $\mathcal R_g (h) = h \odot g$ is the right multiplication by $g$. We said that left/right multiplications lead to equivalent theories, only differing by a sign change. That is typically true of Lie theory, but in this particular case, we will make nontrivial observations by considering both $\mathcal L$ and $\mathcal R$ simultaneously. Consider what happens when we compose $\mathcal R$ with $\mathcal L^{-1}$:

<p>
\[
    \begin{align}
    \mathcal R \circ \mathcal L^{-1}:\ G \times \mathfrak g &\rightarrow G \times \mathfrak g\\
    (g, \tilde X) &\mapsto (g, \mathcal R_{g^{-1}*} \mathcal L_{g*} \tilde X) \nonumber
    \end{align}
    \]
</p>

This is a bundle endomorphism of $G\times \mathfrak g$ (a homomorphism from it to itself). By construction, it is placing the non-commutativity of $G$ under scrutiny. For each tuple of the form $(g,\tilde X )$, $\mathcal R \circ \mathcal L^{-1}$ makes $\tilde X$ take a 'round-trip' by sending it to $T_gG$ via $\mathcal L_{g*}$ and back to $\mathfrak g$ via $\mathcal R_{g^{-1}*}$. Note that $\mathcal R\_{g^{-1}\*} \mathcal L\_{g\*} \tilde X=\textrm{Ad}_g\tilde X$.
The departure of $\textrm{Ad}_g\tilde X$ from $\tilde X$ is a measure of the non-commutativity of multiplication by $g$. Not all group elements are equally non-commutative; for instance, $e$ commutes with all the other group elements.