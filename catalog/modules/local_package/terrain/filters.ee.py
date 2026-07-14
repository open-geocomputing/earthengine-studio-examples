__all__ = ["mask_clouds"]


def mask_clouds(image):
    """Small example filter; replace the bit mask for a production collection."""
    return image.updateMask(image.select(0).mask())
