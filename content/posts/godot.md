---
title: "Godot"
date: 2026-04-05T13:44:06-04:00
draft: true
summary: I'm currently learning the game engine [Godot](https://godotengine.org), and I thought it would be a good idea to take notes here as I go.
---

I'm currently learning the game engine [Godot](https://godotengine.org), and I thought it would be a good idea to take notes here as I go.
Let's first review the [basic ingredients](https://docs.godotengine.org/en/stable/getting_started/introduction/key_concepts_overview.html) of a Godot project. If I got any of the details of Godot wrong, lmk!

# Basics
## <span class=accented>Nodes</span> are Class Instances
A <span class=accented>node</span> refers to an instance/object of a class. We can always pick a node and ask the question, "What class is this an instance of?", and the answer to this question defines a mapping/function

$$
\mathrm{nodes} \rightarrow \mathrm{classes}
$$

that maps a given node to the class that it's an instance of. 

There are two types of classes in Godot -- built-in classes called <span class=accented>engine types</span> implemented in C++, and <span class=accented>user-defined classes</span> defined via scripts. Think of the class hierarchy as a tree with each vertex colored with one of two colors.
Given an instance `node`, `node.get_class()` gives us the nearest built-in class among `node`'s class and its ancestors, whereas `node.get_script()` gives us `node`'s class itself whenever it's user-defined, and `null` otherwise (e.g., for a plain `Node3D` node). So one way of getting a node's class unconditionally is
```GDScript
node.get_script() if node.get_script() != null else node.get_class()
```

<figure class=deinvertible style="max-width: 90%;">
<img src="/post-images/godot/paste-2026-04-06-01-59-46.png">
<figcaption>Some of the built-in classes in Godot, and their hierarchy</figcaption>
</figure>


Annoyingly, there is also a "Node" class which every other class in the figure above inherits either directly or indirectly. I will avoid talking about the "Node" class in this article.

## <span class=accented>Scripts</span> are Class Definitions
When you create a <span class=accented>script</span>, it defines a new class. For example, here I define a class `Plant` that `extends Node3D`, where *extends* means *inherits*:

<figure class=deinvertible style="max-width: 100%;">
<img src="/post-images/godot/paste-2026-04-06-00-57-40.png" style="clip-path: inset(0 0 0 0.6mm); mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
</figure>

<figure class=deinvertible style="max-width: 100%;">
<img src="/post-images/godot/paste-2026-04-06-01-05-44.png" style="clip-path: inset(0 0 0 0.6mm);">
</figure>

Notice that the printed output says `Node3D` rather than `Plant`! This is because the class hierarchy in Godot is really a tree containing two different types of vertices: <span class=accented>built-in classes</span>, which are written in C++ and compiled into the engine, and <span class=accented>user-defined classes</span>, which are defined by scripts. The built-in classes occupy the upper portion of the tree and the user-defined classes are grafted onto them, so that any chain of inheritance eventually bottoms out at a built-in class. Structurally, an instance of `Plant` is just an instance of `Node3D` with the script `plant.gd` attached to it. This nuance makes exactly one appearance in this article -- right here, in the meanings of the methods `get_class()` and `get_script()`. The former returns the nearest built-in class, ignoring user-defined class names, which explains the printout above. The latter returns the attached script, from which the user-defined class name can be recovered: `get_script().get_global_name()` returns `"Plant"`.

By default, a user-defined class will extend/inherit the `RefCounted` class; the line `extends Node3D` overrides this default with my intention that my class `Plant` should inherit `Node3D` instead. Of course, `Plant`, `Node3D`, and `RefCounted` are all still descendants of the `Object` class.

Each `.gd` file defines a class. But `.gd` files are not quite the scripts themselves. We have to use the *load* function to convert a `.gd` file to a `GDScript` object. The expression `load("res://plant.gd")` maps the string `"res://plant.gd"` to an object of type `GDScript`. We can think of `GDScript` itself as a *metaclass*, a class whose objects are themselves classes![^obj]

[^obj]: I use "objects" to allude to instances of a metaclass, and "instances" to refer to instances of a regular class (e.g., `Node3D`). 

The <span class=accented>inspector</span> pane (on the right) lets you inspect the selected node's class properties, ordered from top to bottom in ascending order of lineage:
<figure class=deinvertible style="max-width: 40%;">
<img src="/post-images/godot/paste-2026-04-12-21-57-36.png" style="clip-path: inset(0.5mm 0 0 0); mask-image: linear-gradient(to bottom, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
<figcaption>DirectionalLight3D inherits Light3D, which inherits VisualInstance3D</figcaption>
</figure>

If you have a `DirectionalLight3D` node called `sun`, you can do `sun as Node3D` to <span class=accented>cast</span> `sun` into a `Node3D` type; i.e., `sun` forgets everything that it inherited from the intersection of `Node3D`'s descendants and `DirectionalLight3D`'s ancestors.[^forgetful]

[^forgetful]: This is much like if a class `Group` inherited `Set`, you can do `special_orthogonal as Set` to view the elements of $SO(n)$ as a set; it's a [forgetful functor](https://ncatlab.org/nlab/show/forgetful+functor)!


## <span class=accented>Scenes</span> are Rooted Trees of Nodes
A <span class=accented>scene</span> is a [tree](https://en.wikipedia.org/wiki/Tree_(graph_theory)) (in the graph-theoretic sense) of nodes. Each directed edge in this graph indicates a parent-child relationship. Godot uses an $(n+1)\times (n+1)$ matrix (viewed as an element of $\mathrm{GL}(n)\ltimes \mathbb R^n$) to denote the transformation from the parent to the child, with $n=2$ or $3$. A node in a given scene may be the root node of another scene. This allows us to edit nested scenes in a separate tab. The [docs](https://docs.godotengine.org/en/stable/getting_started/introduction/key_concepts_overview.html) put it very well: 


> In Godot, a <span class=accented>game</span> is a tree of nodes that you group together into scenes. Godot lets you compose or aggregate scenes: you can create a BlinkingLight scene and a BrokenLantern scene that uses the BlinkingLight. Then, create a city filled with BrokenLanterns. Change the BlinkingLight's color, save, and all the BrokenLanterns in the city will update instantly.

So if a game is a tree of nodes, a scene is a sub-tree in this game that can be edited/reasoned about in isolation from the main game. 

## Execution
Suppose you've programmed your game, defined all of your parent-child relationships and typed in your scripts. When you press play, Godot walks down through the nodes in your game and executes their <span class=accented>`_enter_tree()`</span> methods; a parent enters the tree before their children do, which lets you "prepare" a parent for their child's arrival.
The engine will then execute the <span class=accented>`_ready()`</span> methods of your nodes in reverse order; the parent makes sure each of their children is ready before executing their own `_ready()`. Someone on Reddit described this as "enter down, ready up"!

The engine then starts running the <span class=accented>`_process()`</span> and <span class=accented>`_physics_process()`</span> methods of each node. The difference between these is that the engine takes care to run the physics process at (by default) 60Hz, while `_process()` might be called less or more often depending on resources. So the movement rules of our upcoming boids simulation should live inside `_physics_process()`.

Yet another way to get code to execute is using <span class=accented>signals</span>. Certain events (e.g., pressing of a button) can be set up to fire a signal that emanates through the confines of your game. You can make other nodes "listen" for this signal and cause certain functions to execute when this signal is heard.

---

# Example: Boids
I begin by defining a standard "WASD" input scheme in <span class=accented>Project Settings $\rightarrow$ Input Map</span>, which will let us control one of the boids. I then make a scene called `boid.tscn`:
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

I can <span class=accented>instantiate</span> the `boid.tscn` scene in the game (i.e., the main tree) using the "link" button. In this sense, `boid.tscn` is nothing but a template/definition of a tree. I want to add a player character first, which is itself a boid, albeit a special one that responds to my keyboard inputs. A clean way to implement this is to add another boid instance in the main scene, then add a `leader.gd` script to it that `extends Boid` by modifying one of its methods:


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

When I do this, I'm telling Godot *Hey, I want a sub-tree that looks exactly like `boid.tscn` at this location in the game tree, and I want to overwrite the root node of that sub-tree to be of the `leader.gd` class.*  Similarly, there is a `follower.gd` class that also `extends Boid`. Rather than instantiating follower instances one-by-one, I create a `boid_spawner.gd` class that spawns follower boids at game instantiation.

