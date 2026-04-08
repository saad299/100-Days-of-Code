print("Functions")
print("-" * 20)


# No parameters, no return value
def greet():
    print("Hello")


greet()


# With parameters, no return value
def greet(name):
    print("Hello", name)


greet("Saad")


# With parameters, with return value
def add(a, b):
    return a + b


print(add(5, 3))


# key-value pairs as arguments (Keyword arguments)
def student(name, age):
    print(f"Hello {name}, you are {age} years old")


student("Saad", 27)
student(name="John", age=30)


## Default parameters. No return value
def greet(name="World"):
    print("Hello", name)


greet()
greet("Saad")
name = greet("Ahmad")
print(name)


def log(message):
    print(f"[LOG]: {message}")


log("User logged in")
log("User logged out")
result = log("User logged out")
print(result)
print(log)


def add_items(cart, item):
    cart.append(item)


my_cart = ["apple"]
print(my_cart)
add_items(my_cart, "banana")
print(my_cart)
print(add_items)

print("-" * 20)


## return multiple things
def min_max(numbers):
    return min(numbers), max(numbers)


high, low = min_max([1, 20, 3, 4, 5])
print(high, low)

print("-" * 20)


## Lambda functions
square = lambda x: x * x
print(square(5))

add = lambda x, y: x + y
print(add(5, 3))


## Keyword arguments
def example(**kwargs):
    print(kwargs)


example(name="John", age=30)
print(example)


## Sum all numbers
def sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total


print(sum([1, 2, 3, 4, 5]))


## Find even numbers
def even(numbers):
    even_nums = []
    for num in numbers:
        if num % 2 == 0:
            even_nums.append(num)
    return even_nums


print(even([1, 2, 3, 4, 5]))

print("-" * 20)


## Find the top student
def top_student(dict):
    for key, value in dict.items():
        if value == max(dict.values()):
            return key, value


print(top_student({"John": 90, "Jane": 80, "Bob": 70}))


print("-" * 20)


def find_duplicates(words):
    duplicates = {}
    for w in words:
        if w in duplicates:
            duplicates[w] += 1
        else:
            duplicates[w] = 1
    dupes = {word for word, count in duplicates.items() if count > 1}
    print(f"Duplicated items: {dupes}\nDuplicated array: {duplicates}")
    # return dupes, duplicates


print(find_duplicates(["apple", "banana", "apple", "cherry", "banana"]))
