import os
import matplotlib.pyplot as plt
import seaborn
from matplotlib_venn import venn3, venn3_circles


colors = seaborn.color_palette("Set2", 3)
labels = ('C', 'B', '           A')

set1 = set(['A', 'B', 'C'])
set2 = set(['B', 'C'])
set3 = set(['C'])
v = venn3([set1, set2, set3], ('', '', ''), set_colors=colors)
vc = venn3_circles([set1, set2, set3])

for i, _id in enumerate(("100", "110", "111")):
    v.get_label_by_id(_id).set_text(labels[i])

plt.savefig(os.path.join(os.pardir, "plots", "venn_1.png"))