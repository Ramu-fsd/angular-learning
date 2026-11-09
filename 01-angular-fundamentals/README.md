# 01 – Angular Fundamentals

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This module builds the foundation for enterprise Angular development using business-oriented examples. The examples use a digital-banking context: customer profiles, account summaries, beneficiaries, and payment drafts.

> These are focused learning modules, not a second copy of a complete Angular workspace. Add the examples to an Angular application created with a currently supported Angular CLI version. Keep each application's Angular, TypeScript, and Node.js versions aligned with the compatibility matrix for that Angular release.

## Learning objectives

By the end of this module, you should be able to:

1. Use TypeScript types, interfaces, unions, generics, and access modifiers in Angular applications.
2. Design standalone components with clear inputs, outputs, and responsibilities.
3. Understand Angular templates and the modern template control-flow syntax.
4. Use interpolation, property binding, event binding, and two-way binding safely.
5. Explain component lifecycle hooks and clean up subscriptions/resources.
6. Understand dependency injection and provide services at the appropriate scope.
7. Organize an application around standalone components and explicit imports.

## Folder guide

| Folder | What you will learn | Business example |
|---|---|---|
| `typescript-fundamentals` | Types, interfaces, unions, generics, classes | Banking API models |
| `components` | Component composition, inputs, outputs | Account summary and payment form |
| `templates` | Template syntax and control flow | Transaction list |
| `data-binding` | Four binding types and forms | Payment draft |
| `lifecycle-hooks` | Initialization, input changes, cleanup | Customer profile loading |
| `dependency-injection` | Services, providers, injection tokens | Account API service |
| `standalone-components` | Standalone architecture and imports | Banking feature composition |

## Recommended learning order

1. Read the folder README.
2. Review the source example and explain each line in your own words.
3. Add the example to a local Angular workspace.
4. Run the application and test the user interaction.
5. Add at least one validation or failure case.
6. Write a short note explaining the design decision and trade-off.

## Engineering standards

- Prefer strict TypeScript typing; avoid `any`.
- Keep API models separate from UI components.
- Keep components focused on presentation and user interaction.
- Put HTTP and business operations in injectable services.
- Do not store secrets, real customer data, account numbers, tokens, or credentials in source control.
- Treat frontend validation as usability support; enforce all security and business rules on the backend.
- Use synthetic data only.
- Use `OnPush` where appropriate and understand the change-detection implications.
- Prefer Angular's current recommended APIs; do not mix examples from incompatible Angular versions.

## Interview checkpoints

You should be able to explain:
- Component vs. directive vs. service.
- Interface vs. type alias in TypeScript.
- Constructor injection and the `inject()` function.
- Input/output communication and unidirectional data flow.
- Interpolation vs. property binding.
- Lifecycle hook order and why cleanup matters.
- Standalone components vs. NgModule-based organization.
- Why frontend validation cannot replace backend validation.

## Completion checklist

- [ ] I can model a banking API response using TypeScript types.
- [ ] I can build a standalone component and compose child components.
- [ ] I can explain template control flow.
- [ ] I can implement all four data-binding styles.
- [ ] I can explain lifecycle hooks and cleanup.
- [ ] I can inject a service and describe provider scope.
- [ ] I can run and test a standalone feature.
