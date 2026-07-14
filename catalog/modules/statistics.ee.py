__all__ = ["mean", "center"]


def mean(values):
    return sum(values) / len(values)


def center(values):
    average = mean(values)
    return [value - average for value in values]
