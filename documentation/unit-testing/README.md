# Unit testing

A unit test is a method that instantiates a small portion of our application and verifies its behavior independently from other parts. It has 3 phases Arrange, Act and Assert

 - Arrange: initializes a small piece of an application it wants to test
 - Act: applies some stimulus to the system under test
 - Assert: observes the resulting behavior. If the observed behavior is consistent with the expectations, the unit test passes, otherwise, it fails

Difference with Integration test
The objective of a unit test is to verify the behavior of a relatively small piece of software, independently from other parts while integration test demonstrate that different parts of a system work together in the real-life environment and usually require external resources.

## Test Driven Development

Test Driven Development, or TDD, is a code design technique where the programmer writes a test before any production code, and then writes the code that will make that test pass.

## How to make a good test

 - Easy to write
 - Readable, the intent of a unit test should be clear
 - Reliable, unit tests should fail only if there’s a bug in the system under test
 - Fast, so they can repeatedly run them and check that no bugs have been introduced and the developer dont skip them.

## Warnings to detect hard to test code

 - Static Properties and Fields
 - Singletons
 - The  new Operator

## Benefits

 - Clean code
 - Easy to maintain and change
 - No tightly coupled
 - Easy to integrate
 - The test give a guideline in how to use a unit of code (documentation)
