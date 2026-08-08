---
title: "SE(3) Boids"
date: 2026-04-05T13:44:06-04:00
draft: true
---

I'm currently learning the game engine [Godot](https://godotengine.org). As an introductory project, I am going to create a [boids](https://brubsby.com/?a=23)-style simulation that uses some light Lie group theory.
Let's first review the [basic ingredients](https://docs.godotengine.org/en/stable/getting_started/introduction/key_concepts_overview.html) of a Godot project. If I got any of the details of Godot wrong, let me know! 

# Basics
## <span class=accented>Nodes</span> are Class Instances
A <span class=accented>node</span> refers to an instance/object of a class. Since each node is the instance of some class, there is a mapping

$$
\mathrm{nodes} \rightarrow \mathrm{classes}
$$

that maps a given node to the class that it's an instance of.
This mapping lives as a <span class=accented>method</span> that is inherited by all nodes; given `node`$\in\mathrm{nodes}$, we have `node.get_class()`$\in \mathrm{classes}$.


<figure class=deinvertible style="max-width: 90%;">
<img src="/post-images/godot/paste-2026-04-06-01-59-46.png">
<figcaption>Some of the built-in classes in Godot, and their heirarchy</figcaption>
</figure>


Annoyingly, there is also a "Node" class which every other class inherits either directly or indirectly. To avoid confusion, I will not talk about the "Node" class in this article.

## <span class=accented>Scripts</span> are Class Definitions
When you create a <span class=accented>script</span>, it defines a new class. For example, here I define a class `Plant` that `extends Node3D`, where *extends* means *inherits*:

<figure class=deinvertible style="max-width: 100%;">
<img src="/post-images/godot/paste-2026-04-06-00-57-40.png" style="clip-path: inset(0 0 0 0.6mm); mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
</figure>

<figure class=deinvertible style="max-width: 100%;">
<img src="/post-images/godot/paste-2026-04-06-01-05-44.png" style="clip-path: inset(0 0 0 0.6mm);">
</figure>

We can therefore define a map

$$
\mathrm{scripts} \rightarrow \mathrm{classes}
$$

that maps a script to the class it defines -- this is accomplished by the `load` function. The expression `load("res://plant.gd")` maps the string `"res://plant.gd"` to an object of type `GDScript`. 
The <span class=accented>inspector</span> pane (on the right) lets you inspect the selected node's class properties, ordered from top to bottom in ascending order of lineage:
<figure class=deinvertible style="max-width: 40%;">
<img src="/post-images/godot/paste-2026-04-12-21-57-36.png" style="clip-path: inset(0.5mm 0 0 0); mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
<figcaption>DirectionalLight3D inherits Light3D, which inherits VisualInstance3D</figcaption>
</figure>

If you have a `DirectionLight3D` node called `sun`, you can do `sun as Node3D` to cast `sun` into a `Node3D` type.[^forgetful]

[^forgetful]: This is much like if a class `Group` inherited `Set`, you can do `special_orthogonal as Set` to view the elements of $SO(n)$ as a set; it's the [forgetful functor](https://ncatlab.org/nlab/show/forgetful+functor)!


## <span class=accented>Scenes</span> are Rooted Trees of Nodes
A <span class=accented>scene</span> is a [tree](https://en.wikipedia.org/wiki/Tree_(graph_theory)) (in the graph-theoretic sense) of nodes. Each directed edge in this graph indicates a parent-child relationship. Godot uses an $(n+1)\times (n+1)$ matrix (viewed as an element of $\mathrm{GL}(n)\ltimes \mathbb R^n$) to denote the transformation from the parent to the child, with $n=2$ or $3$. A node in a scene can itself be a scene. This allows us to edit nested scenes in a separate tab. The [docs](https://docs.godotengine.org/en/stable/getting_started/introduction/key_concepts_overview.html) put it very well: 


> In Godot, a <span class=accented>game</span> is a tree of nodes that you group together into scenes. Godot lets you compose or aggregate scenes: you can create a BlinkingLight scene and a BrokenLantern scene that uses the BlinkingLight. Then, create a city filled with BrokenLanterns. Change the BlinkingLight's color, save, and all the BrokenLanterns in the city will update instantly.

So if a game is a tree of nodes, a scene is a sub-tree in this game that can be edited/reasoned about in isolation from the main game. 

## Execution
Suppose you've programmed your game, defined all of your parent-child relationships and typed in your scripts. When you press play, Godot walks down through the nodes in your game and executes their <span class=accented>`_enter_tree()`</span> methods; a parent enters the tree before their children do, which let's you "prepare" a parent for their child's arrival.
The engine will then execute the <span class=accented>`_ready()`</span> methods of your nodes in reverse order; the parent makes sure each of their children is ready before executing their own `_ready()`. Someone on Reddit described this as "enter down, ready up"!

The engine then starts running the <span class=accented>`_process()`</span> and <span class=accented>`_physics_process()`</span> methods of each node. The difference between these is that the engine takes care to run the physics process at (by default) 60Hz, while `_process()` might be called less or more often depending on resources. So the consensus rule of our upcoming boids simulation should live inside `_physics_process()`.

Yet another way to get code to execute is using <span class=accented>signals</span>. Certain events (e.g., pressing of a button) can be set up to fire a signal that emanates through the confines of your game. You can make other objects "listen" for this signal and cause certain functions to execute when this signal is heard.

---

# $SE(3)$ Boids
## Setting the Scene
I begin by defining a standard "WASD" input scheme in <span class=accented>Project Settings $\rightarrow$ Input Map</span>, which will let us control one of the boids. I then make a scene called `boid.tcsn`:
<figure class=deinvertible style="max-width: 45%;">
<img src="/post-images/godot/paste-2026-04-12-21-32-23.png">
<figcaption></figcaption>
</figure>

and attach a script to its root node, specifying
```GDScript
class_name Boid
extends Node3D
```
which automatically changes the class of the root node from `Node3D` to my custom class, `Boid`.

I can <span class=accented>instantiate</span> the `boid.tcsn` scene in the game (i.e., the main tree) using the "link" button. In this sense, `boid.tcsn` is nothing but a template/definition of a tree. I want to add a player character first, which is itself a boid, albeit a special one that responds to my keyboard inputs. A clean way to implement this is to add another boid object in the main scene, then add a `leader.gd` script to it that `extends Boid` by modifying one of its methods:


<div style="display: flex; justify-content: center; gap: 0.05em; margin-left: -5%; margin-right: -5%;">
<figure class=deinvertible style="flex: 1; margin: 0;">
<img src="/post-images/godot/paste-2026-04-19-01-50-47.png" style="width: 100%; clip-path: inset(0.5% 1% 0 1%);">
<figcaption></figcaption>
</figure>
<figure class=deinvertible style="flex: 1; margin: 0;">
<img src="/post-images/godot/paste-2026-04-19-01-51-05.png" style="width: 100%; clip-path: inset(0.5% 0% 0 1%);">
<figcaption></figcaption>
</figure>
</div>


<figure style="max-width: 100%;">
<img src="/post-images/godot/paste-2026-04-19-01-03-27.png" style="mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
<figcaption>I've oriented each of my boids such that its $\mathrm{xyz}$ (i.e., RGB) axes correspond to roll, pitch, and yaw</figcaption>
</figure>

When I do this, I'm telling Godot *Hey, I want a sub-tree that looks exactly like `boid.tcsn` at this location in the game tree, and I want to overwrite the root node of that sub-tree to be of the `leader.gd` class.*  Similarly, there is a `follower.gd` class that also `extends Boid`. Rather than instantiating follower objects one-by-one, I create a `boid_spawner.gd` class that spawns follower boids at game instantiation.

## Consensus
The main mathematical challenge that I had to work through was: How do you specify a boids-like ruleset in $SE(3)$ that respects non-holonomic constraints? I am a fan of [this paper](https://arxiv.org/pdf/0807.4416) by Alain Sarlette, where he explains how consensus on left-invariant velocities differs from consensus on right-invariant velocities, for non-commutative groups like $SE(3)$. A quick reading of this paper will show that <span class=accented>consensus on right-invariant velocities</span> is what we want (Sarlette confusingly refers to this as left-invariant consensus). You can think of it as consensus on world-frame velocities, which sort of makes sense. $\newcommand{\mf}[1]{\mathbf{#1}}$ $\newcommand{\mono}[4]{ { ^{#2} {\mathrm{#1}} ^{#3} _{#4} } }$ $\newcommand{\bomega}{\boldsymbol{\omega}}$ $\newcommand{\ddt}[1]{{\small\frac{d}{dt}}\!\left[ #1 \right]}$

Here's a quick review of the [monogram notation](posts/robotics): We can express the global transform of a given boid as $\mono Xe{g_t}{}$, where $g_t$ is a time-varying frame attached to the boid and $e$ is a fixed reference "world" frame. Suppose our boid $g_t$ has a neighbor, to which is attached the frame $h_t$. The body-frame velocities of our boids are $\mono {\Lambda}e{g_t}{g_t}$ and $\mono {\Lambda}e{h_t}{h_t}$, and their world-frame velocities are $\mono {\Lambda}e{g_t}{e}$ and $\mono {\Lambda}e{h_t}{e}$. The velocity of the neighbor as seen by our first boid is $\mono {\Lambda}e{h_t}{g_t}= \mathrm{Ad}(\mono{X}{g_t}{h_t}{}) \mono {\Lambda}e{h_t}{h_t}$. The velocity $\mono {\Lambda}e{h_t}{g_t}$ is computed by treating $e$ as the stationary/inertial frame, while $\mono {\Lambda}{g_t}{h_t}{g_t}$ is computed in the inertial frame of $g_t$. When the lower subscript is the same, we can add/subtract velocities:
$$
\mono {\Lambda}{e}{h_t}{g_t}= \mono {\Lambda}{e}{g_t}{g_t} + \mono {\Lambda}{g_t}{h_t}{g_t}
$$
which was the punchline of my [previous post](posts/robotics).
In practice, I'd replace $h_t$ by the average of $g_t$'s neighbors' velocities (as seen from $g_t$). We can then define an energy function that measures the deviation of $g_t$'s body-frame velocity from $h_t$:

$$
\begin{align*}
E_t &= \frac 12\left\lVert \mono {\Lambda}{g_t}{h_t}{g_t}\right\rVert^2\\
 &= \frac 12\left\lVert \mono {\Lambda}e{h_t}{g_t} - \mono {\Lambda}e{g_t}{g_t}\right\rVert^2\\
&= \frac 12\left\lVert \mathrm{Ad}(\mono X{g_t}{h_t}{})\mono {\Lambda}e{h_t}{h_t} - \mono {\Lambda}e{g_t}{g_t} \right\rVert^2
\end{align*}
$$

where $\lVert\,\cdot\,\rVert$ is a norm for $\mathfrak{se}(3)$ (see [my review article](https://arxiv.org/abs/2508.12030)) that's induced by an inner-product. This proves to be close to consensus of right-invariant velocities, so long as you view $g_t$ as the "world frame". I like that this cost function doesn't involve the arbitrary frame $e$, as the choice of $e$ is something that our consensus law should be oblivious to. In that sense, this is the most natural consensus law that one could write down. The notation is speaking to us, you just have to listen carefully!


Using the standard basis for $\mathfrak{se}(3)$, we can also express $E_t$ as

$$
\begin{align*}
\frac 12\left\lVert 
\begin{bmatrix}
\mono R{g_t}{h_t}{} & 0 \\ ({\mono {\mf t}{g_t}{h_t}{g_t}})^\wedge\, \mono R{g_t}{h_t}{} & \mono R{g_t}{h_t}{}
\end{bmatrix}
\begin{bmatrix}
\mono {\bomega}e{h_t}{h_t}\\ \mono {\mf v}e{h_t}{h_t}
\end{bmatrix}
-
\begin{bmatrix}\mono\bomega e{g_t}{g_t}\\ \mono{\mf v}e{g_t}{g_t} \end{bmatrix}
\right\rVert^2_{\mf W}
\end{align*}
$$
which is how I implement it on the computer. Here, $\mf W$ defines a weighted inner product for $\mathfrak{se}(3)$ that scales the translational part by a constant $\alpha$, i.e. $\mf W = \mathrm{diag}(1,1,1,\alpha,\alpha,\alpha)$. You can think of $\alpha$ as having the units $\mathrm{rad}^2/\mathrm{m}^2$ -- small $\alpha$ means that we care about angle-error more; radians are expensive, so you get fewer radians per meter.

Let $\epsilon_t \coloneq \mono{\Lambda}e{h_t}{g_t} - \mono{\Lambda}e{g_t}{g_t}$ and $q_t \coloneq \mono X{g_t}{h_t}{}$, so that $\mono{\Lambda}e{h_t}{g_t} = \mathrm{Ad}(q_t)\mono{\Lambda}e{h_t}{h_t}$. To differentiate $\tilde E_t$, we need $\ddt{\mono{\Lambda}e{h_t}{g_t}}$. Using $\ddt{\mathrm{Ad}(q_t)} = \mathrm{Ad}(q_t)\,\mathrm{ad}(\mono{\Lambda}e{q_t}{q_t})$ and the equivariance $\mathrm{Ad}(q)[\xi,\eta] = [\mathrm{Ad}(q)\xi,\,\mathrm{Ad}(q)\eta]$, together with the relative velocity $\mono{\Lambda}e{q_t}{q_t} = \mono{\Lambda}e{h_t}{h_t} - \mathrm{Ad}(q_t^{-1})\mono{\Lambda}e{g_t}{g_t}$, one finds

$$
\ddt{\mono{\Lambda}e{h_t}{g_t}} = \bigl[\mono{\Lambda}e{h_t}{g_t},\,\mono{\Lambda}e{g_t}{g_t}\bigr] + \mono{A}e{h_t}{g_t}{}
$$

so that $\ddt{\epsilon_t} = [\mono{\Lambda}e{h_t}{g_t},\mono{\Lambda}e{g_t}{g_t}] + \mono{A}e{h_t}{g_t}{} - \mono{A}e{g_t}{g_t}{}$, and therefore

$$
\ddt{\tilde E_t} = \epsilon_t^\top \mf W \left(\bigl[\mono{\Lambda}e{h_t}{g_t},\,\mono{\Lambda}e{g_t}{g_t}\bigr] + \mono{A}e{h_t}{g_t}{} - \mono{A}e{g_t}{g_t}{}\right).
$$

Setting $\ddt{\tilde E_t} = -\kappa\lVert\epsilon_t\rVert^2_{\mf W}$ gives the control law

$$
\begin{align*}
 \mono{A}e{g_t}{g_t}{} = \mono{A}e{h_t}{g_t}{} + \bigl[\mono{\Lambda}e{h_t}{g_t}{},\;\mono{\Lambda}e{g_t}{g_t}{}\bigr] + \kappa\left(\mono{\Lambda}e{h_t}{g_t}{} - \mono{\Lambda}e{g_t}{g_t}{}\right).
\end{align*}
$$

Here $\mf W$ defines the inner product on $\mathfrak{se}(3)$.

## Cohesion / Separation



## Non-holonomic Constraints

Real aircraft cannot translate sideways or vertically at will — they reorient first, then fly forward in the new direction. To capture this, we restrict each boid's velocity to the sub-algebra

$$
\mathfrak{g}_{\mathrm{nh}} \coloneq \bigl\{(\omega_x, \omega_y, \omega_z,\, v_x, 0, 0)\bigr\} \subset \mathfrak{se}(3),
$$

enforcing $v_y = v_z = 0$ at every timestep. The consensus rule, however, produces an unconstrained desired twist that may have nonzero $v_y$ and $v_z$. Simply discarding these components would ignore the reorientation information they carry.

Instead, we interpret them as desired heading changes and redirect them into angular rates. For a lateral drift $v_y$: a boid that wants to move along its pitch axis should bank (roll) so that its forward thrust develops a component in that direction — a coordinated banked turn. For a vertical drift $v_z$: the boid yaws to redirect its heading. This gives the linear map

$$
\omega_x \;\leftarrow\; \omega_x + \mu\, v_y, \qquad \omega_z \;\leftarrow\; \omega_z + \mu\, v_z,
$$

where $\mu$ (rad s$^{-1}$ / m s$^{-1}$) = `nonholo_gain` controls how aggressively lateral drift is converted to rotation. After applying this map, $v_y$ and $v_z$ are zeroed. The result is a flock that banks into turns rather than sliding sideways — the non-holonomic constraint is satisfied and the motion looks physically plausible.

