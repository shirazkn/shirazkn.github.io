---
title: "Singular Value Decomposition"
date: 2023-06-04T10:10:35-04:00
draft: true
---

A linear transformation on the vectors of $\mathbb R^n$, $\bold A: \mathbb R^n \rightarrow \mathbb R^m$, takes every vector in $\mathbb R^n$ to a vector in $\mathbb R^m$. We represent such linear transformations as <span class=accented>matrices</span>, and their actions on the vectors are represented by *matrix multiplication*. Let $\bold A$ also denote the $n \times m$ matrix that represents this transformation. 

While the codomain of $\bold A$ is $\mathbb R^m$, its range (the set of values it actually maps to) might be a subspace of $\mathbb R^m$ whose dimension is smaller than $m$. This is because $\bold A$ might map some subspaces of $\mathbb R^n$ to $\bold 0$. The union of the subspaces that are mapped to $\bold 0$ under $\bold A$ is called the *null space* of $\bold A$, denoted as $\text{Null}(\bold A)$. At the same time, $\bold A$ cannot map $\mathbb R^n$ to a vector space of dimension greater than $n$. Mapping to a lower-dimensional vector space is akin to 'losing' information (which is possible), whereas mapping to a higher-dimensional vector space is akin to 'creating information out of nowhere' (which is not possible).