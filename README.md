# module2-project

APP routes

| PATH                                       | DESCRIPTION                                               | PROTECTED |
|--------------------------------------------|-----------------------------------------------------------|-----------|
| `/`                                        | Página principal                                          |           |
| `/explore`                                 | Página de exploración                                     |           |
| `/signup`                                  | Página de registro                                        |           |
| `/login`                                   | Página de inicio de sesión                                |           |
| `/payment`                                 | Página de pago                                            |    ✅     |
| `/project/:id/plan/checkout`               | Página de pago para un proyecto                           |    ✅     |
| `/project/:id/plan/checkout/:id`           | Página de pago para un plan específico en un proyecto     |    ✅     |
| `/project/:id/edit`                        | Página de edición de un proyecto específico               |    ✅     |
| `/project/:id`                             | Página de detalles de un proyecto específico              |           |
| `/create/project/:projectId/plan`          | Página para crear un nuevo plan en un proyecto específico |    ✅     |
| `/profile/:userId`                         | Página de perfil de usuario                               |    ✅     |
| `/create/project`                          | Página para crear un nuevo proyecto                       |    ✅     |