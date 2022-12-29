import sys
import random
import time
import math

from keygen import POPULATE_PRIMES1000, CHECK_IF_PRIME

sys.setrecursionlimit(5000)

def POLLARD_RHO(n, start_time):
  if n <= 0:
    return 0, (time.time() - start_time)

  POPULATE_PRIMES1000()
  if n == 1 or CHECK_IF_PRIME(n) == True:
    return 1, (time.time() - start_time)

  if ((n % 2) == 0):
    return 2, (time.time() - start_time)

  i = 0
  curr = random.randint(0, n - 1)
  y = curr
  k = 2

  while (1):
    i = i + 1
    next = (pow(curr, 2) - 1) % n
    d = math.gcd((y - next), n)
    if (d > 1) and (d < n):
      return d, (time.time() - start_time)

    if (i == k):
      y = next
      k = 2 * k
            
    curr = next

def POLLARD_P_MINUS_1(n, B, start_time):
  if ((n % 2) == 0):
    return 2, (time.time() - start_time)

  a = 2
  m = 2

  while (m <= B):
    a = pow(a, m) % n
    d = math.gcd((a - 1), n)

    if (d > 1) and (d < n):
      return d, (time.time() - start_time)

    m = m + 1
        
  return 1, (time.time() - start_time)

def SQUARE_ROOT_TRIVIAL_DIVISION(n, start_time):
  p = math.isqrt(n)

  if (pow(p, 2) == n):
    return p, (time.time() - start_time)
        
  if ((p % 2) == 0):
    p = p + 1
        
  while ((n % p) != 0):
    p = p + 2

    if (p == n):
      return 1, (time.time() - start_time)

  return p, (time.time() - start_time)