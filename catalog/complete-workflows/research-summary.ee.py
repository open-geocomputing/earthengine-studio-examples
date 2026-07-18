__all__ = ["summarize"]


def summarize(values):
    """Return portable summary values to the JavaScript entrypoint."""
    clean = [float(value) for value in values]
    return {
        "count": len(clean),
        "mean": sum(clean) / len(clean),
        "minimum": min(clean),
        "maximum": max(clean),
    }
