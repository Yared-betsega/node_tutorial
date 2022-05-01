# from collections import Counter, defaultdict
# n = int(input())
# for i in range(n):
#     length = int(input())
#     nums = list(map(int, input().split()))
#     count = defaultdict(int)
#     printed = False
#     for num in nums:
#         count[num]+=1
#         if count[num] >= 3:
#             printed = True
#             print(num)
#             break
#     if not printed:
#         print(-1)

# n, v = list(map(int, input().split()))
# if v >= n:
#     print(n-1)
# else:
#     l, tot = 1, 0
#     for i in range(1, n+1):
#         l -= 1
#         if (n-i) <= l:
#             print(tot)
#             break
#         tot += ((v - l) * i)
#         l += (v - l)

# a1, a2 =  list(map(int, input().split()))

# cur = 0 if a1 <= a2 else 1
# i = 0
# while a1 > 0 and a2 > 0:
#     if a1 == 1 and a2 == 1:
#         break
#     if cur == 0:
#         a1 += 1
#         a2 -= 2
#     else:
#         a1 -= 2
#         a2 += 1
    
#     if a1 <= 2:
#         cur = 0
#     elif a2 <= 2:
#         cur = 1
#     i += 1
    
# print(i)

def find_set(i):
    if i == parent[i]:
        return i
    parent[i] = find_set(parent[i])
    return parent[i]

def union_sets(i, j):
    a = find_set(i)
    b = find_set(j)
    if a!=b:
        if size[a] >= size[b]:
            parent[b] = a
            size[a] += size[b]
        else:
            parent[a] = b
            size[b] += size[a]

parent = {}
size = {}

n, q = list(map(int, input().split()))
ex = 0
for i in range(q):
    x, y = list(map(int, input().split()))
    if find_set(x) == find_set(y):
        ex += 1
    else:
        if x not in parent:
            parent[x] = x
            size[x] = 1
        if y not in parent:
            parent[y] = y
            size[y] = 1
        union_sets(x, y)
    