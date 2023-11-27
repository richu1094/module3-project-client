# module2-project

APP routes

| PATH                                          | DESCRIPTION                                               | PROTECTED |
|-----------------------------------------------|-----------------------------------------------------------|-----------|
| `/`                                           | Página principal                                          |           |
| `/explore`                                    | Página de exploración                                     |           |
| `/signup`                                     | Página de registro                                        |           |
| `/login`                                      | Página de inicio de sesión                                |           |
| `/payment`                                    | Página de pago                                            |    ✅     |
| `/project/:projectId/plan/checkout`           | Página de pago para un proyecto                           |    ✅     |
| `/project/:projectId/plan/checkout/:planId`   | Página de pago para un plan específico en un proyecto     |    ✅     |
| `/project/:projectId/edit`                    | Página de edición de un proyecto específico               |    ✅     |
| `/project/:projectId`                         | Página de detalles de un proyecto específico              |           |
| `/create/project/:projectId/plan`             | Página para crear un nuevo plan en un proyecto específico |    ✅     |
| `/profile/:userId`                            | Página de perfil de usuario                               |    ✅     |
| `/create/project`                             | Página para crear un nuevo proyecto                       |    ✅     |