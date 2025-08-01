import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

# Définition du "sablier" comme surface de révolution d'une hyperbole
theta = np.linspace(0, 2 * np.pi, 60)
z = np.linspace(-2, 2, 60)
theta, z = np.meshgrid(theta, z)

# Forme sablier : f(z) = 1 / (|z| + 1)
r = 1 / (np.abs(z) + 1)
x = r * np.cos(theta)
y = r * np.sin(theta)

# Création de la figure
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Surface principale : le sablier
ax.plot_surface(x, y, z, alpha=0.7, cmap='cool', linewidth=0)

# Ajout de timelines semi-transparentes
for i in np.linspace(-1, 1, 5):
    t = np.linspace(-2, 2, 100)
    x_tl = np.sin(t + i)
    y_tl = np.cos(t + i)
    z_tl = t
    ax.plot(x_tl * 0.1, y_tl * 0.1, z_tl, color='orange', alpha=0.3)

# Axes personnalisés
ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Temps / Timeline")

ax.set_title("Structure de l'Interstice — Sablier Holographique", fontsize=14)
plt.tight_layout()
plt.show()
