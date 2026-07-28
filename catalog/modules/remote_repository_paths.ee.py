import sys

# This public package root is trusted as part of the official example catalog.
sys.path.insert(
    0,
    "gh:open-geocomputing/earthengine-studio-examples"
    "@master:/catalog/modules/local_package",
)

from terrain.filters import mask_clouds

print("Remote Python function", mask_clouds)
