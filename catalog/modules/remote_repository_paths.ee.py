import sys

# Replace these public example coordinates with repositories containing the
# imported modules. Refs may be a branch, tag, or commit SHA.
sys.path.append("gh:owner/repository@v1.2.0:/python")
sys.path.insert(0, "gl:group/project@main:/python")

from processing.indices import ndvi
from terrain.filters import mask_clouds

print(ndvi, mask_clouds)
