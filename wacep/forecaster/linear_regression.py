import numpy as np


def linregress(x, y):
    """
    Calculate a regression line

    This computes a least-squares regression for two sets of measurements.

    From SciPy
    https://github.com/scipy/scipy/blob/master/scipy/stats/stats.py
    lifted out of the code base as the compilation is extremely heavy.
    simplified a bit for this application

    Parameters
    ----------
    x, y : arrays
        two sets of measurements.  Both arrays should have the same length.
        If only x is given (and y=None), then it must be a two-dimensional
        array where one dimension has length 2.  The two sets of measurements
        are then found by splitting the array along the length-2 dimension.

    Returns
    -------
    slope : float
        slope of the regression line
    intercept : float
        intercept of the regression line
    r-value : float
        correlation coefficient
    stderr : float
        Standard error of the estimate


    Examples
    --------
    >>> from scipy import stats
    >>> import numpy as np
    >>> x = np.random.random(10)
    >>> y = np.random.random(10)
    >>> slope, intercept, r_value, p_value, std_err = stats.linregress(x,y)

    # To get coefficient of determination (r_squared)

    >>> print "r-squared:", r_value**2
    r-squared: 0.15286643777

    """
    n = len(x)
    xmean = np.mean(x, None)
    ymean = np.mean(y, None)

    # average sum of squares:
    ssxm, ssxym, ssyxm, ssym = np.cov(x, y, bias=1).flat
    r_num = ssxym
    r_den = np.sqrt(ssxm * ssym)
    if r_den == 0.0:
        r = 0.0
    else:
        r = r_num / r_den
        # test for numerical error propagation
        if (r > 1.0):
            r = 1.0
        elif (r < -1.0):
            r = -1.0

    df = n - 2
    slope = r_num / ssxm
    intercept = ymean - slope * xmean
    sterrest = np.sqrt((1 - r * r) * ssym / ssxm / df)
    return slope, intercept, r, sterrest
