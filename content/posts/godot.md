---
title: "Godot"
date: 2026-04-05T13:44:06-04:00
draft: true
---

I'm currently learning the game engine [Godot](https://godotengine.org). This quick tutorial serves as a companion to the [official documentation](https://docs.godotengine.org/en/stable/getting_started/introduction/key_concepts_overview.html), and is intended for beginner game devs like me who have a math and/or CS background.

## <span class=accented>Nodes</span> are Class Instances
A <span class=accented>node</span> refers to an instance/object of a class. Each node is the instance of some class, so there's a map

$$
\mathrm{nodes} \rightarrow \mathrm{classes}
$$

that maps a node to the class that it's an instance of.
This mapping lives as a <span class=accented>method</span> that is inherited by all nodes; given `node`$\in\mathrm{nodes}$, we have `node.get_class()`$\in \mathrm{classes}$.


<figure class=deinvertible style="max-width: 90%;">
<img src="/post-images/godot/paste-2026-04-06-01-59-46.png">
<figcaption></figcaption>
</figure>



Annoyingly, there is also a "Node" class, which every other class inherits either directly or indirectly. To avoid confusion, I will not talk about the "Node" class in this article.

## <span class=accented>Scripts</span> are Class Definitions
When you create a <span class=accented>script</span>, it defines a new class. This class can inherit another class. For example, `extends Node3D` here indicates that the `Plant` class inherits `Node3D`:

<figure class=deinvertible style="max-width: 100%;">
<img src="/post-images/godot/paste-2026-04-06-00-57-40.png" style="clip-path: inset(0 0 0 0.6mm); mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
</figure>

<figure class=deinvertible style="max-width: 100%;">
<img src="/post-images/godot/paste-2026-04-06-01-05-44.png" style="clip-path: inset(0 0 0 0.6mm);">
</figure>

Clearly, there's a map

$$
\mathrm{scripts} \rightarrow \mathrm{classes}
$$

that maps a script to the class it defines -- this is the `load` function. The expression `load("res://plant.gd")` evaluates to an object of type `GDScript`, which makes sense because scripts are class definitions. 

## <span class=accented>Scenes</span> are Rooted Trees of Nodes
A <span class=accented>scene</span> is a [tree](https://en.wikipedia.org/wiki/Tree_(graph_theory)) (in the graph-theoretic sense) of nodes. Each directed edge in this graph indicates a parent-child relationship. Godot uses an $n\times n$ matrix (viewed as an element of $\mathrm{GL}(n)\ltimes \mathbb R^n$) to denote the transformation from the parent to the child, with $n=2$ or $3$. A node in a scene can itself be a scene, so that the nested scene can be conveniently edited in a separate tab. The [docs](https://docs.godotengine.org/en/stable/getting_started/introduction/key_concepts_overview.html) put it very well: 


> In Godot, a <span class=accented>game</span> is a tree of nodes that you group together into scenes. [Furthermore, you can] compose or aggregate scenes: you can create a BlinkingLight scene and a BrokenLantern scene that uses the BlinkingLight. Then, create a city filled with BrokenLanterns. Change the BlinkingLight's color, save, and all the BrokenLanterns in the city will update instantly.